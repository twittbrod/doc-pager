import { Router } from "express";
import * as cannedMessageRouter from "../canned-messages/router";
import * as expressSession from 'express-session';
import { User as UserModel } from "../models/users";
import { login } from "./module";
import * as bodyParser from "body-parser";

const router = Router();

router.use(bodyParser.urlencoded({extended : true}));

router.use(expressSession({
    secret: 'spark',
    saveUninitialized: true,
    resave: false
}));


router.use( async (req, res, next) => {
    if (typeof req.session.user_id !== 'undefined') {
        try {
            let user = await UserModel.findById(req.session.user_id).exec();
            if (!user) {
                throw new Error('Unauthorized');
            }
            req.user = user;
            next();
        } catch(error) {
            next(error);
        }
     } else {
        next();
     }
})

router.use(function(req, res, next) {
    if(req.user){
        res.locals.user = req.user;
    }
    next();
});


router.use(async (req, res, next) => {
    if(req.session.user_id) {
        let user = await UserModel.findById(req.session.user_id).exec();
        if (!user) {
            throw new Error("No such user in db");
        }
        req.user = user;
        next();
    } else {
        next();
    }
});

//login page.
router.route('/login').get(async (req, res) => {
    res.render('login')
}).post(async (req, res) => {
    try {
        let userId = await login(req.body.name,req.body.password)
        if (!userId) {
            throw new Error('Invalid username or password');
        }
        req.session.user_id = userId
        res.redirect('/admin/messages/list');    
    } catch(error) {
        res.render('login', {errors : [error]})
    }
});


router.use('/messages', (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
        next();
    } else {
        res.redirect('/admin/login');
    }
},cannedMessageRouter);

router.use('/', async(req, res, next) => {
    if (req.user) {
        res.redirect('/admin/messages/list');
    } else {
        res.redirect('/admin/login');
    }
})

router.use((err: Error , req, res, next) => {
    // res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        // production error handler
        // no stacktraces leaked to user
        error: (process.env.NODE_ENV === 'development') ? err : {}
    }); 
});


export = router;