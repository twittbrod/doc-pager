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
const users_1 = require("../models/users");
const module_1 = require("./module");
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
router.route(['/', '/setup']).get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let admin = yield module_1.setupAdmin();
        if (admin && admin.role == users_1.Roles[users_1.Roles.admin]) {
            res.render('setup');
        }
        else {
            res.render('add');
        }
    }
    catch (error) {
        next(error);
    }
})).post((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!req.body) {
            throw new Error('Invalid username or password');
        }
        let admin = yield module_1.addAdmin(req.body);
        res.redirect(relativeURL('/'));
    }
    catch (error) {
        res.render('add', { errors: [error] });
    }
}));
module.exports = router;
//# sourceMappingURL=router.js.map