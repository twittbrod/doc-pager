"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require("express");
const cannedMessageRouter = require("../canned-messages/router");
const expressSession = require('express-session');
const users_1 = require("../models/users");
const module_1 = require("./module");
const bodyParser = require("body-parser");
const router = express_1.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressSession({
    secret: 'spark',
    saveUninitialized: true,
    resave: false
}));
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (typeof req.session.user_id !== 'undefined') {
        try {
            let user = yield users_1.User.findById(req.session.user_id).exec();
            if (!user) {
                throw new Error('Unauthorized');
            }
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next();
    }
}));
router.use(function (req, res, next) {
    if (req.user) {
        res.locals.user = req.user;
    }
    next();
});
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.session.user_id) {
        let user = yield users_1.User.findById(req.session.user_id).exec();
        if (!user) {
            throw new Error("No such user in db");
        }
        req.user = user;
        next();
    }
    else {
        next();
    }
}));
//login page.
router.route('/login').get((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.render('login');
})).post((req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let userId = yield module_1.login(req.body.name, req.body.password);
        if (!userId) {
            throw new Error('Invalid username or password');
        }
        req.session.user_id = userId;
        res.redirect('/admin/messages/list');
    }
    catch (error) {
        res.render('login', { errors: [error] });
    }
}));
router.use('/messages', (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
        next();
    }
    else {
        res.redirect('/admin/login');
    }
}, cannedMessageRouter);
router.use('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.user) {
        res.redirect('/admin/messages/list');
    }
    else {
        res.redirect('/admin/login');
    }
}));
router.use((err, req, res, next) => {
    // res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        // production error handler
        // no stacktraces leaked to user
        error: (process.env.NODE_ENV === 'development') ? err : {}
    });
});
module.exports = router;
//# sourceMappingURL=router.js.map