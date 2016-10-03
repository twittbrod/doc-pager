import { Router } from "express";
import {Roles} from "../models/users";
import {setupAdmin,addAdmin} from "./module";
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

router.route(['/', '/setup']).get(async (req, res, next) => {
    try {
        let admin = await setupAdmin()
        if (admin && admin.role == Roles[Roles.admin]) {
            res.render('setup')
        }
        else {
            res.render('add');
        }
    } catch (error) {
        next(error);
    }
}).post(async (req, res, next) => {
    try {
        if (!req.body) {
            throw new Error('Invalid username or password');
        }
        let admin = await addAdmin(req.body)
        res.redirect(relativeURL('/'));
    } catch (error) {
        res.render('add', { errors: [error] })
    }

});

export = router;
