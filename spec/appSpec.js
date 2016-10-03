"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const utils_1 = require("./utils");
const request_promise_1 = require("./request-promise");
describe("App tests", () => {
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield utils_1.startServer();
        done();
    }));
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield utils_1.stopServer();
        done();
    }));
    it("should return hello world for /", (done) => __awaiter(this, void 0, void 0, function* () {
        let { response, body } = yield request_promise_1.get('/');
        expect(response.statusCode).toBe(200);
        expect(body).toBe("Hello World");
        done();
    }));
});
//# sourceMappingURL=appSpec.js.map