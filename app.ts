import * as express from "express";
import { OK, INTERNAL_SERVER_ERROR } from "http-status-codes";
import * as sparkConfig from "./spark_config";
import ciscospark from 'ciscospark/es6';
import { User as UserModel } from './models/users';
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import { generateRefreshToken } from "./spark-auth";
import * as apiRouter from "./api/router";
import * as adminRouter from "./admin/router";
import * as setupRouter from "./setup-admin/router"
import * as path from 'path';

// twittbrod edits
import * as dns from 'dns';
// end twittbrod edits

const app : express.Application = express();

app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/cisco-doc-pager-dev');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
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

app.get('/callback/spark', async (req, res, next) => {
    // try {
    //     let user = await generateRefreshToken(req.query.code);
    //     req.session.user_id = user.id;
    //     res.redirect("/");
    // } catch (error) {
    //     next(error);
    // }
    // res.status(OK).send(req.query);
    res.redirect(`${req.query.state}?code=${req.query.code}`);
})

app.use((error: Error , req, res, next) => {
    //TODO: Render an error page.
   res.status(error.code < 600 ? error.code : INTERNAL_SERVER_ERROR || INTERNAL_SERVER_ERROR).send({errors: [{error: error.message || error.error}]}) 
});


export = app;