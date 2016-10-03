"use strict";
exports.PORT = 7000;
exports.BASE_URL = `http://localhost:${exports.PORT}`;
const app = require("../app");
let server;
function dropTables() {
    // UserSchema.remove({}).exec();
    return;
}
exports.dropTables = dropTables;
function startServer() {
    return new Promise((resolve, reject) => {
        server = app.listen(exports.PORT, () => {
            resolve();
        });
    });
}
exports.startServer = startServer;
function stopServer() {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
exports.stopServer = stopServer;
//# sourceMappingURL=utils.js.map