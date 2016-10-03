import { Router, Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from "http-status-codes";
import * as teamsRouter from "../teams/router";
import * as roomsRouter from "../rooms/router";
import * as messagesRouter from "../messages/router";
import * as peopleRouter from "../people/router";
import { generateRefreshToken, verify, sign } from "../spark-auth";
import { User as UserModel } from "../models/users";
import { list } from "../canned-messages/module";
import * as cors from "cors";

const router = Router();

router.use(cors());

router.route('/authenticate').post( async (req, res, next) => {
    if (!req.body.code) {
        return next(new Error('`code` required to authenticate'));
    }
    try {
        let user = await generateRefreshToken(req.body.code);
        res.status(OK).send({access_token : await sign(user.id)});
    } catch(error) {
        next(error);
    }
})

router.route('/messages/canned').get( async (req, res, next) => {
    try {
        let cannedMessages : [any]= await list();
        res.status(OK).send(cannedMessages.map(message => {
            return {id : message.id, description: message.description};
        }));
    } catch(error) {
        next(error);
    }
});

//Check for access token
router.use(async (req, res, next) => {
    if (!req.query.access_token) {
        return next(new Error('Unauthorized'));
    }
    try {
        let payload = await verify(req.query.access_token);
        req.user = await UserModel.findById(payload.user).exec();
        if (!req.user) {
            throw new Error('No such user exists');
        }
        next();
    } catch (error) {
        next(error);
    }
});

router.use('/people', peopleRouter);

router.use('/teams', teamsRouter);
router.use('/rooms', roomsRouter);
router.use('/messages', messagesRouter);

router.use((error: Error , req, res, next) => {
   res.status(INTERNAL_SERVER_ERROR).send(JSON.stringify(error)); 
});

export = router; 