"use strict";
const request = require("request");
//exports.clientId = "XXXXXXXXXXXXXXXXXX";
//exports.clientSecret = "XXXXXXXXXXXXXXXXXX";
exports.clientId = process.env.TOKEN_SPARK_CLIENT;
exports.clientSecret = process.env.SECRET_SPARK_CLIENT;

exports.oAuthAuthorizationURL = `https://api.ciscospark.com/v1/authorize?client_id=${exports.clientId}&response_type=code&redirect_uri=https%3A%2F%2Flearninglabs.cisco.com%2Fposts%2Ffiles%2Fcollab-spark-auth%2Fspark-auth.html&scope=spark%3Amessages_write%20spark%3Arooms_read%20spark%3Amemberships_read%20spark%3Amessages_read%20spark%3Arooms_write%20spark%3Apeople_read%20spark%3Amemberships_write&state=set_state_here`;
exports.authorizedRedirectURLs = ["https://learninglabs.cisco.com/posts/files/collab-spark-auth/spark-auth.html", "http://54.194.198.47:3000/auth/callback"];
var DEFAULT_REDIRECT_URI = "http://localhost:8080/callback/spark";
var ROOT = "https://api.ciscospark.com/v1";
var OAUTH_URL = ROOT + "/authorize";
exports.TOKEN_URL = ROOT + "/access_token";
function generateOAuthURL(scopes = exports.DEFAULT_SCOPES, redirectURI = DEFAULT_REDIRECT_URI, state = "blahblah") {
    let params = ["client_id=" + encodeURIComponent(exports.clientId),
        "response_type=code",
        "redirect_uri=" + encodeURIComponent(redirectURI),
        "scope=" + encodeURIComponent(scopes.join(" ")),
        "state=" + encodeURIComponent(state)];
    return OAUTH_URL + "?" + params.join("&");
}
exports.generateOAuthURL = generateOAuthURL;
function generateTokenURL(code, redirectURI = DEFAULT_REDIRECT_URI) {
    let params = ["grant_type=authorization_code",
        "redirect_uri=" + encodeURIComponent(redirectURI),
        "code=" + decodeURIComponent(code),
        "client_id=" + encodeURIComponent(exports.clientId),
        "client_secret=" + encodeURIComponent(exports.clientSecret)
    ];
    return exports.TOKEN_URL + "?" + params.join("&");
}
exports.generateTokenURL = generateTokenURL;
function getAccessToken(code) {
    // return Promise.resolve({"access_token":"Y2Y2MDUyMTgtYjllMy00OGJlLWI4Y2MtZWM5NmViNGE0YzM4NjYwMDM1NTEtZDhi","expires_in":1209599,"refresh_token":"NTlhZmM5MTAtOGUzMy00OGMyLWI0NzktOGYyNzk5NjJhNzQ2ZGNiZDNlY2YtMWQy","refresh_token_expires_in":7773148})
    return new Promise((resolve, reject) => {
        request.post({ url: exports.TOKEN_URL, form: {
                grant_type: "authorization_code",
                redirect_uri: DEFAULT_REDIRECT_URI,
                code: code,
                client_id: exports.clientId,
                client_secret: exports.clientSecret
            } }, (err, httpResponse, body) => {
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
    });
}
exports.getAccessToken = getAccessToken;
exports.SCOPE_PEOPLE_READ = "spark:people_read";
exports.SCOPE_ROOMS_READ = "spark:rooms_read";
exports.SCOPE_ROOMS_WRITE = "spark:rooms_write";
exports.SCOPE_MEMBERSHIPS_READ = "spark:memberships_read";
exports.SCOPE_MEMBERSHIPS_WRITE = "spark:memberships_write";
exports.SCOPE_TEAMS_READ = "spark:teams_read";
exports.SCOPE_TEAMS_WRITE = "spark:teams_write";
exports.SCOPE_TEAM_MEMBERSHIPS_READ = "spark:team_memberships_read";
exports.SCOPE_TEAM_MEMBERSHIPS_WRITE = "spark:team_memberships_write";
exports.SCOPE_MESSAGES_READ = "spark:messages_read";
exports.SCOPE_MESSAGES_WRITE = "spark:messages_write";
exports.DEFAULT_SCOPES = [
    exports.SCOPE_MESSAGES_WRITE,
    // SCOPE_ROOMS_READ, 
    exports.SCOPE_TEAMS_READ,
    // SCOPE_MEMBERSHIPS_READ,
    // SCOPE_MESSAGES_READ, 
    // SCOPE_ROOMS_WRITE, 
    exports.SCOPE_PEOPLE_READ,
    // SCOPE_MEMBERSHIPS_WRITE, 
    exports.SCOPE_TEAM_MEMBERSHIPS_READ
];
//# sourceMappingURL=spark_config.js.map