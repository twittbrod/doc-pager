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
const module_1 = require("./module");
const router = express_1.Router();
router.route(['/', '/list']).get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.status(http_status_codes_1.OK).send(yield module_1.list(req.user.auth_spark.access_token));
    }
    catch (error) {
        next(error);
    }
}));
router.route('/:teamId/members').get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let teamMembers = yield module_1.members(req.user.auth_spark.access_token, req.params.teamId);
        res.status(http_status_codes_1.OK).send(teamMembers.filter(member => member.personId != req.user.spark_id));
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
//# sourceMappingURL=router.js.map