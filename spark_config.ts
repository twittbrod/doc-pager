import * as request from "request";

//export var clientId = "XXXXXXXXXXXXXXXXXX";
//export var clientSecret =  "XXXXXXXXXXXXXXXXXX";
export var clientId = process.env.TOKEN_SPARK_CLIENT;
export var clientSecret = process.env.SECRET_SPARK_CLIENT;

export var oAuthAuthorizationURL = `https://api.ciscospark.com/v1/authorize?client_id=${clientId}&response_type=code&redirect_uri=https%3A%2F%2Flearninglabs.cisco.com%2Fposts%2Ffiles%2Fcollab-spark-auth%2Fspark-auth.html&scope=spark%3Amessages_write%20spark%3Arooms_read%20spark%3Amemberships_read%20spark%3Amessages_read%20spark%3Arooms_write%20spark%3Apeople_read%20spark%3Amemberships_write&state=set_state_here`;
export var authorizedRedirectURLs =  ["https://learninglabs.cisco.com/posts/files/collab-spark-auth/spark-auth.html", "http://54.194.198.47:3000/auth/callback"];

var DEFAULT_REDIRECT_URI = "http://localhost:8080/callback/spark";
var ROOT = "https://api.ciscospark.com/v1";
var OAUTH_URL = ROOT + "/authorize";
export var TOKEN_URL = ROOT + "/access_token";

export function generateOAuthURL(scopes : string[] = DEFAULT_SCOPES, redirectURI : string= DEFAULT_REDIRECT_URI, state : string ="blahblah") {
    let params = ["client_id="+encodeURIComponent(clientId),
                "response_type=code",
                "redirect_uri="+encodeURIComponent(redirectURI),
                "scope="+encodeURIComponent(scopes.join(" ")),
                "state="+encodeURIComponent(state)];
    return OAUTH_URL+"?"+params.join("&");
}

export function generateTokenURL(code : string, redirectURI: string = DEFAULT_REDIRECT_URI) : string {
    let params = ["grant_type=authorization_code", 
        "redirect_uri="+ encodeURIComponent(redirectURI),
        "code="+ decodeURIComponent(code),
        "client_id="+ encodeURIComponent(clientId), 
        "client_secret="+ encodeURIComponent(clientSecret) 
    ];
    return TOKEN_URL + "?"+ params.join("&");
}

export function getAccessToken(code : string) : Promise<any> {
    
    // return Promise.resolve({"access_token":"Y2Y2MDUyMTgtYjllMy00OGJlLWI4Y2MtZWM5NmViNGE0YzM4NjYwMDM1NTEtZDhi","expires_in":1209599,"refresh_token":"NTlhZmM5MTAtOGUzMy00OGMyLWI0NzktOGYyNzk5NjJhNzQ2ZGNiZDNlY2YtMWQy","refresh_token_expires_in":7773148})

    return new Promise((resolve, reject) => {
        request.post({url: TOKEN_URL, form:{
            grant_type : "authorization_code",
            redirect_uri : DEFAULT_REDIRECT_URI,
            code: code,
            client_id : clientId,
            client_secret: clientSecret
        }}, (err,httpResponse,body) => {
            if (err) {
                reject(err);
                return;
            }
            if (httpResponse.statusCode != 200) {
                reject(new Error(httpResponse.statusMessage));
                return;
            }
            resolve(JSON.parse(body));
        });    
    })
}

export const SCOPE_PEOPLE_READ = "spark:people_read";
export const SCOPE_ROOMS_READ = "spark:rooms_read";
export const SCOPE_ROOMS_WRITE = "spark:rooms_write";
export const SCOPE_MEMBERSHIPS_READ = "spark:memberships_read";
export const SCOPE_MEMBERSHIPS_WRITE = "spark:memberships_write";  
export const SCOPE_TEAMS_READ = "spark:teams_read";
export const SCOPE_TEAMS_WRITE = "spark:teams_write";
export const SCOPE_TEAM_MEMBERSHIPS_READ = "spark:team_memberships_read";
export const SCOPE_TEAM_MEMBERSHIPS_WRITE = "spark:team_memberships_write";
export const SCOPE_MESSAGES_READ = "spark:messages_read";
export const SCOPE_MESSAGES_WRITE = "spark:messages_write";
export const DEFAULT_SCOPES = [
    SCOPE_MESSAGES_WRITE, 
    // SCOPE_ROOMS_READ, 
    SCOPE_TEAMS_READ, 
    // SCOPE_MEMBERSHIPS_READ,
    // SCOPE_MESSAGES_READ, 
    // SCOPE_ROOMS_WRITE, 
    SCOPE_PEOPLE_READ, 
    // SCOPE_MEMBERSHIPS_WRITE, 
    SCOPE_TEAM_MEMBERSHIPS_READ
];