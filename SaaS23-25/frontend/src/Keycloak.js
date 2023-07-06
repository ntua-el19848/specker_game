import Keycloak from "keycloak-js";
import config from "./config.json";

/* url is the Keycloak server URL, 
realm is your created realm name
, and clientId is the name of the created client. */

// export HTTPS=true&&SSL_CRT_FILE=../certs/server.crt&&SSL_KEY_FILE=../certs/server.key

const keycloak = new Keycloak({
 url: "http://"+config.keycloak+":8080/",
 realm: "myCharts",
 clientId: "myChartsClient",
});

export default keycloak;