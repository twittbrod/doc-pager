"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const canned_messages_model_1 = require("./canned-messages-model");
function create(body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield canned_messages_model_1.Messages.create({ description: body.description });
    });
}
exports.create = create;
function list() {
    return __awaiter(this, void 0, Promise, function* () {
        return yield canned_messages_model_1.Messages.find({}, { description: 1 });
    });
}
exports.list = list;
function read(messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield canned_messages_model_1.Messages.findById(messageId);
    });
}
exports.read = read;
function update(messageId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield canned_messages_model_1.Messages.findByIdAndUpdate(messageId, { $set: { description: message } }, { new: true }).exec();
    });
}
exports.update = update;
function remove(messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield canned_messages_model_1.Messages.findOneAndRemove(messageId).exec();
    });
}
exports.remove = remove;
//# sourceMappingURL=module.js.map