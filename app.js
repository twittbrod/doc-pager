"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const http_status_codes_1 = require("http-status-codes");
const sparkConfig = require("./spark_config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const apiRouter = require("./api/router");
const adminRouter = require("./admin/router");
const setupRouter = require("./setup-admin/router");
const path = require('path');

// twittbrod edits
const dns = require('dns');
// end twittbrod edits

const app = express();
app.use(morgan('dev'));
mongoose.Promise = global.Promise;

// twittbrod edits
var mongo_url = '';
dns.resolveSrv(process.env.MONGO_SERVICE, function onResolve(err, addresses) {
    if (err) {
        console.log(err);
    } else {
        console.log('addresses: ', addresses);
        mongo_url = process.env.MONGO_SERVICE + ':' + addresses[0].port;
        process.env.MONGO_URL = mongo_url;
        mongoose.connect(mongo_url);
    };
});
//mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/cisco-doc-pager-dev');
// end twittbrod edits

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/setup', setupRouter);
app.use('/', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/connect/spark', (req, res) => {
    let oAuthRedirectURL = `${req.protocol}://${req.get("host")}/callback/spark`;
    res.redirect(sparkConfig.generateOAuthURL(sparkConfig.DEFAULT_SCOPES, oAuthRedirectURL, req.get('Referer') || '/'));
});
app.get('/callback/spark', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // try {
    //     let user = await generateRefreshToken(req.query.code);
    //     req.session.user_id = user.id;
    //     res.redirect("/");
    // } catch (error) {
    //     next(error);
    // }
    // res.status(OK).send(req.query);
    res.redirect(`${req.query.state}?code=${req.query.code}`);
}));
app.use((error, req, res, next) => {
    //TODO: Render an error page.
    res.status(error.code < 600 ? error.code : http_status_codes_1.INTERNAL_SERVER_ERROR || http_status_codes_1.INTERNAL_SERVER_ERROR).send({ errors: [{ error: error.message || error.error }] });
});
module.exports = app;
//# sourceMappingURL=app.js.map