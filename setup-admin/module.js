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
function setupAdmin() {
    return __awaiter(this, void 0, Promise, function* () {
        return yield users_1.User.findOne({ role: 'admin' });
    });
}
exports.setupAdmin = setupAdmin;
function addAdmin(body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.User.create({ name: body.name, password: body.password, role: users_1.Roles[users_1.Roles.admin] });
    });
}
exports.addAdmin = addAdmin;
//# sourceMappingURL=module.js.map