// Auth0 constants
const AUTH_URL = "https://dev-8todrv-h.au.auth0.com";
const AUTH0_LOGIN_CLIENT_ID = 'mbzAHWAY87lsRfJvpDgb99P2XgdFJGCP';
const AUTH0_SOCIALLOGIN_CLIENT_ID = 'J3zNaHiP2l2rWHH1Kj1O1qIdL0oBn8Nf';
const AUTH0_AUDIENCE = 'https://dev-8todrv-h.au.auth0.com/api/v2/';
const AUTH0_REALM = 'Username-Password-Authentication';
const AUTH0_GRANTTYPE = 'password';
const AUTH0_SCOPE = "openid email profile";
const AUTH0_SOCIALLOGIN_SCOPE = "openid email profile offline_access read:current_user update:current_user_metadata";
export const AZURE_BLOB_SAS_TOKEN = "sv=2019-10-10&ss=b&srt=co&sp=rwac&se=2120-05-01T12:44:02Z&st=2020-05-01T04:44:02Z&spr=https&sig=b1tNRBmXLapYgHv0KPNC4vOMwxGSD59rpEmxvENFdec%3D";
const AZURE_VIDEO_CONTAINER = "https://60secondsblobdev.blob.core.windows.net/videocontainer";
const AZURE_PROFILEPICTURE_CONTAINER = "https://60secondsblobdev.blob.core.windows.net/profilepiccontainer";

// API constants
export const BASE_URL = "https://thedlvrco-sixtyseconds-webapi-staging.azurewebsites.net/api"
export const FILEPATH_AUDIO = 'rehearse';
export const SENTRY_DSN = 'https://eda8b06c579343f8b3f5a0fe76a3d25a@o400967.ingest.sentry.io/5259899';

export default {
    AUTH_URL,
    AUTH0_LOGIN_CLIENT_ID,
    AUTH0_SOCIALLOGIN_CLIENT_ID,
    AUTH0_AUDIENCE,
    AUTH0_REALM,
    AUTH0_GRANTTYPE,
    AUTH0_SCOPE,
    BASE_URL,
    AZURE_BLOB_SAS_TOKEN,
    AZURE_PROFILEPICTURE_CONTAINER,
    AZURE_VIDEO_CONTAINER,
    AUTH0_SOCIALLOGIN_SCOPE
}