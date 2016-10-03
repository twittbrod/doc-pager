"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const request_promise_1 = require('./request-promise');
const utils_1 = require("./utils");
const AUTH_CODE = 'OGZmZDZjNWEtY2RhMi00MzI3LWEzMTAtNmUwYWMzODJlZDQ5N2UwMWRlNjAtMDM5';
let getJSON = (body) => {
    if (typeof body === 'object') {
        return body;
    }
    return JSON.parse(body);
};
describe("API ", () => {
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield utils_1.startServer();
        done();
    }));
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield utils_1.stopServer();
        done();
    }));
    let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTc5N2M1YTQwMDc1NjcwZTRjNWM1NmVmIiwiaWF0IjoxNDY5NTY1MDMxfQ.gqN77-uZtkpWvkI7qaMhcr_Fd8cdtaY7WrMvkviW5nw";
    let someTeamId;
    let someMemberPersonId;
    let someMessageId;
    it("should successfully authenticate with valid code ", (done) => __awaiter(this, void 0, void 0, function* () {
        let { response, body } = yield request_promise_1.post('/api/authenticate', { json: { code: AUTH_CODE } });
        expect(response.statusCode).toBe(200);
        let json = getJSON(body);
        expect(json.access_token).not.toBeNull();
        accessToken = json.access_token;
        done();
    }));
    it("should fetch the list of teams ", (done) => __awaiter(this, void 0, void 0, function* () {
        let { response, body } = yield request_promise_1.get(`/api/teams?access_token=${accessToken}`);
        expect(response.statusCode).toBe(200);
        let teams = getJSON(body);
        expect(teams.length).toBeGreaterThan(0);
        expect(teams[0].id).not.toBeNull();
        someTeamId = teams[0].id;
        done();
    }));
    it("should fetch the members of a team ", (done) => __awaiter(this, void 0, void 0, function* () {
        let { response, body } = yield request_promise_1.get(`/api/teams/${someTeamId}/members?access_token=${accessToken}`);
        expect(response.statusCode).toBe(200);
        let members = getJSON(body);
        expect(members.length).toBeGreaterThan(0);
        expect(members[0].personId).not.toBeNull();
        someMemberPersonId = members[0].personId;
        done();
    }));
    it("Should send a message to a team member ", (done) => __awaiter(this, void 0, void 0, function* () {
        let { response, body } = yield request_promise_1.post(`/api/messages?access_token=${accessToken}`, { json: {
                personId: someMemberPersonId,
                message: 'Hello doctor, please hurry'
            } });
        let message = getJSON(body);
        expect(message.id).not.toBeNull();
        someMessageId = message.id;
        done();
    }));
    xit("Should delete the message", (done) => __awaiter(this, void 0, void 0, function* () {
        let { response, body } = yield request_promise_1.post(`/api/messages/${someMessageId}/delete?access_token`);
        expect(response.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=apiSpec.js.map