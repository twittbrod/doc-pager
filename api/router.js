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
const http_status_codes_1 = require("http-status-codes");
const teamsRouter = require("../teams/router");
const roomsRouter = require("../rooms/router");
const messagesRouter = require("../messages/router");
const peopleRouter = require("../people/router");
const spark_auth_1 = require("../spark-auth");
const users_1 = require("../models/users");
const module_1 = require("../canned-messages/module");
const router = express_1.Router();
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'X-Custom-Header, x-requested-with, Authorization, Content-Type, oauth');
    next();
});
router.route('/authenticate').post((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body.code) {
        return next(new Error('`code` required to authenticate'));
    }
    try {
        let user = yield spark_auth_1.generateRefreshToken(req.body.code);
        res.status(http_status_codes_1.OK).send({ access_token: yield spark_auth_1.sign(user.id) });
    }
    catch (error) {
        next(error);
    }
}));
router.route('/messages/canned').get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let cannedMessages = yield module_1.list();
        res.status(http_status_codes_1.OK).send(cannedMessages.map(message => {
            return { id: message.id, description: message.description };
        }));
    }
    catch (error) {
        next(error);
    }
}));
//Check for access token
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.query.access_token) {
        return next(new Error('Unauthorized'));
    }
    try {
        let payload = yield spark_auth_1.verify(req.query.access_token);
        req.user = yield users_1.User.findById(payload.user).exec();
        if (!req.user) {
            throw new Error('No such user exists');
        }
        next();
    }
    catch (error) {
        next(error);
    }
}));
router.use('/people', peopleRouter);
router.use('/teams', teamsRouter);
router.use('/rooms', roomsRouter);
router.use('/messages', messagesRouter);
router.use((error, req, res, next) => {
    res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(error);
});
module.exports = router;
//# sourceMappingURL=router.js.map