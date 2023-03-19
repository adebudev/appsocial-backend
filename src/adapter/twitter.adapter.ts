import got from 'got';
import qs from 'qs';
import { oauth } from '../config/twitterClient.js';
import {
  accessTokenURL,
  authorizeURL,
  endpointURL,
  requestTokenURL,
} from '../helpers/urls.js';

async function requestToken() {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: requestTokenURL,
      method: 'POST',
    })
  );

  const request = await got.post(requestTokenURL, {
    headers: {
      Authorization: authHeader['Authorization'],
    },
  });
  if (!request.body) {
    throw new Error('Cannot get an OAuth request token');
  }
  return qs.parse(request.body);
}

async function accessToken({
  oauth_token,
  oauth_token_secret,
  oauth_verifier,
}) {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: accessTokenURL,
      method: 'POST',
    })
  );
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${oauth_verifier}&oauth_token=${oauth_token}`;
  const req = await got.post(path, {
    headers: {
      Authorization: authHeader['Authorization'],
    },
  });
  if (!req.body) {
    throw new Error('Cannot get an OAuth request token');
  }
  return qs.parse(req.body);
}

async function getRequest({ oauth_token, oauth_token_secret, message }) {
  const token = {
    key: oauth_token,
    secret: oauth_token_secret,
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: endpointURL,
        method: 'POST',
      },
      token
    )
  );
  const data = {
    text: message,
  };
  const req = await got.post(endpointURL, {
    json: data,
    responseType: 'json',
    headers: {
      Authorization: authHeader['Authorization'],
      'user-agent': 'v2CreateTweetJS',
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
  if (!req.body) {
    throw new Error('Unsuccessful request');
  }
  return req.body;
}

const getToken = async () => {
  const oAuthRequestToken: {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_callback_confirmed: string;
  } = await requestToken();
  return {
    ...oAuthRequestToken,
    url: `${authorizeURL}?oauth_token=${oAuthRequestToken.oauth_token}&oauth_verifier=${oAuthRequestToken.oauth_token_secret}`,
  };
};

const postTweet = async ({
  oauth_token,
  oauth_token_secret,
  oauth_verifier,
  message,
}) => {
  const oAuthAccessToken = await accessToken({
    oauth_token,
    oauth_token_secret,
    oauth_verifier,
  });
  // Make the request
  const response = await getRequest({ ...oAuthAccessToken, message });
  return response;
};

export { getToken, postTweet };
