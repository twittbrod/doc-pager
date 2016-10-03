import { Router } from "express";
import { sendMessage, deleteMessage } from "./module";
import { OK } from "http-status-codes";

const router = Router();

router.route('/').post(async (req, res, next) => {
    try {
        if (!req.body.personId || !req.body.message) {
            throw new Error('`personId` and `message` expected');
        }
        res.status(OK).send(await sendMessage(req.user.auth_spark.access_token, req.body.personId, req.body.message));
    } catch (error) {
        next(error);
    }
});

router.route('/:messageId/delete').post( async (req, res, next) => {
    try {
        res.status(200).send(await deleteMessage(req.user.auth_spark.access_token, req.params.messageId));
    } catch (error) {
        next(error);
    }
});

export = router;