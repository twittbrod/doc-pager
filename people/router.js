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
router.route('/:personId').get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!req.params.personId) {
            throw new Error('`personId` expected');
        }
        res.status(http_status_codes_1.OK).send(yield module_1.personDetails(req.user.auth_spark.access_token, req.params.personId));
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
//# sourceMappingURL=router.js.map