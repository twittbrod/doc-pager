"use strict";
const utils_1 = require('./utils');
const request = require("request");
function get(relativePath, options = {}) {
    return new Promise((resolve, reject) => {
        request.get(utils_1.BASE_URL + relativePath, options, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            resolve({ response: response, body: body });
        });
    });
}
exports.get = get;
function post(relativePath, options) {
    let url = relativePath.startsWith('/') ? utils_1.BASE_URL + relativePath : relativePath;
    return new Promise((resolve, reject) => {
        request.post(url, options, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            resolve({ response: response, body: body });
        });
    });
}
exports.post = post;
//# sourceMappingURL=request-promise.js.map