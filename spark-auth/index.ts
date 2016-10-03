import { getAccessToken } from "../spark_config";
import { User as UserModel } from "../models/users";
import { verify as jwtVerify, sign as jwtSign } from "jsonwebtoken";
import { personDetails } from "../people/module";

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret';

//TODO: Check if state is the same as the one we sent over.
export async function generateRefreshToken(code : string, state : string = "blah blah") {
    
    let credentials = await getAccessToken(code);
    
    let me = await personDetails(credentials.access_token, "me");
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
    let user = await UserModel.findOne({spark_id:me.id}).exec(); 
            
            //convert expires in to expires at
    credentials.expires_at = new Date(new Date().getTime() + credentials.expires_in * 1000);
    credentials.refresh_token_expires_at = new Date(new Date().getTime() + credentials.refresh_token_expires_in * 1000);
    delete credentials.expires_in;
    delete credentials.refresh_token_expires_in;
    if (!user) {
        user = new UserModel(); 
    }

    user.auth_spark = credentials;
    user.spark_email = me.emails[0];
    user.spark_id = me.id;
    await user.save();
    return user;
}

export async function sign(id) {
    return await jwtSign({user: id}, JWT_SECRET, {});
}

export async function verify(token) {
    return await jwtVerify(token, JWT_SECRET);
}