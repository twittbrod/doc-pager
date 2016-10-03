import { Router } from "express";
import {Messages} from "./canned-messages-model";
import {create, list, read, update,remove} from "./module";
import {Roles} from "../models/users";
import * as paginate from 'express-paginate';
import { OK } from "http-status-codes";
const router = Router();


var relativeURL = (relativeURL: string) : string => {
    return relativeURL;
}

router.use((req, res, next) => {
    res.locals.relativeURL = relativeURL = (relativeURL: string) => {
        return req.baseUrl + relativeURL;
    }
    next();     
});

router.get('/list', async (req, res, next) => {
    try{
        let messages = await list();
        res.render('messages/list', {
            messages : messages
        });
    }catch(error){
        next(error);
    }
})

router.route('/new.:format?').get(async (req, res, next) => {
    res.render('messages/add')
}).post(async (req, res, next) => {
    try {
        let response = await create(req.body)
        if (req.params.format == 'json') {
            res.status(OK).send(response);
        }
        else {
            res.redirect(relativeURL('/list'))
        }
    } catch (error) {
        res.render('messages/add', {errors : [error]})
    }
})

router.route('/:id/update.:format?').get(async (req, res, next) => { 
    res.render('messages/update', {message : await read(req.params.id)})
}).post(async (req, res, next) => {
    try {
        let response = await update(req.params.id, req.body.description);
        if (req.params.format == 'json') {
            res.status(OK).send(response);
        }
        else {
            res.redirect(relativeURL('/list'))
        }
    } catch (error) {
        res.render('messages/update', {errors : [error], message : await read(req.params.id)})
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try{
        let messages = await remove(req.params.id);
        res.redirect(relativeURL('/list'))
    }catch(error){
        next(error);
    }
})
export = router;
