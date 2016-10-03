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
const module_1 = require("./module");
const http_status_codes_1 = require("http-status-codes");
const router = express_1.Router();
var relativeURL = (relativeURL) => {
    return relativeURL;
};
router.use((req, res, next) => {
    res.locals.relativeURL = relativeURL = (relativeURL) => {
        return req.baseUrl + relativeURL;
    };
    next();
});
router.get('/list', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let messages = yield module_1.list();
        res.render('messages/list', {
            messages: messages
        });
    }
    catch (error) {
        next(error);
    }
}));
router.route('/new.:format?').get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.render('messages/add');
})).post((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let response = yield module_1.create(req.body);
        if (req.params.format == 'json') {
            res.status(http_status_codes_1.OK).send(response);
        }
        else {
            res.redirect(relativeURL('/list'));
        }
    }
    catch (error) {
        res.render('messages/add', { errors: [error] });
    }
}));
router.route('/:id/update.:format?').get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.render('messages/update', { message: yield module_1.read(req.params.id) });
})).post((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let response = yield module_1.update(req.params.id, req.body.description);
        if (req.params.format == 'json') {
            res.status(http_status_codes_1.OK).send(response);
        }
        else {
            res.redirect(relativeURL('/list'));
        }
    }
    catch (error) {
        res.render('messages/update', { errors: [error], message: yield module_1.read(req.params.id) });
    }
}));
router.get('/:id/delete', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let messages = yield module_1.remove(req.params.id);
        res.redirect(relativeURL('/list'));
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
//# sourceMappingURL=router.js.map