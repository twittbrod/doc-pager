"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const spark_config_1 = require("../spark_config");
const users_1 = require("../models/users");
const jsonwebtoken_1 = require("jsonwebtoken");
const module_1 = require("../people/module");
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret';
//TODO: Check if state is the same as the one we sent over.
function generateRefreshToken(code, state = "blah blah") {
    return __awaiter(this, void 0, void 0, function* () {
        let credentials = yield spark_config_1.getAccessToken(code);
        let me = yield module_1.personDetails(credentials.access_token, "me");
        /*
            return {
                "id": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS9hZWFjY2ZhNS03YWI0LTRmZWQtYjI5NC1kODlhMjYwYjBhYWQ",
                "emails": [
                    "rajiv@webileapps.com"
                ],
                "displayName": "rajiv@webileapps.com",
                "created": "2016-03-22T19:18:58.092Z"
            }
        */
        let user = yield users_1.User.findOne({ spark_id: me.id }).exec();
        //convert expires in to expires at
        credentials.expires_at = new Date(new Date().getTime() + credentials.expires_in * 1000);
        credentials.refresh_token_expires_at = new Date(new Date().getTime() + credentials.refresh_token_expires_in * 1000);
        delete credentials.expires_in;
        delete credentials.refresh_token_expires_in;
        if (!user) {
            user = new users_1.User();
        }
        user.auth_spark = credentials;
        user.spark_email = me.emails[0];
        user.spark_id = me.id;
        yield user.save();
        return user;
    });
}
exports.generateRefreshToken = generateRefreshToken;
function sign(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.sign({ user: id }, JWT_SECRET, {});
    });
}
exports.sign = sign;
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.verify(token, JWT_SECRET);
    });
}
exports.verify = verify;
//# sourceMappingURL=index.js.map