"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const users_1 = require("../models/users");
function login(name, password) {
    return __awaiter(this, void 0, Promise, function* () {
        if (!name || !password)
            throw new Error('The Username or password that you  entered doesnt match any account');
        let user = yield users_1.User.findOne({ name: name });
        if (!user || !(yield user.comparePassword(password)))
            throw new Error('Invalid username or password');
        return user.id;
    });
}
exports.login = login;
//# sourceMappingURL=module.js.map