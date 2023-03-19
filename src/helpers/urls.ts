const endpointURL = `https://api.twitter.com/2/tweets`;

const requestTokenURL = 'https://api.twitter.com/oauth/request_token?x_auth_access_type=write';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';

export { endpointURL, requestTokenURL, authorizeURL, accessTokenURL };
