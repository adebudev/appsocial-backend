import express from 'express';
import { TwitterApi } from 'twitter-api-v2';

import { TWclientV2 } from '../config/twitterClient.js';
import {
  getTempTokens,
  saveTempTokens,
} from '../adapter/tempTwitterToken.adapter.js';
import {
  getNetworkTokensByUser,
  saveNetworkTokens,
} from '../adapter/networkToken.adapter.js';

const router = express.Router();

router.post('/auth/twitter', async (req, res) => {
  // const authLink = await TWclient.generateAuthLink('https://localhost:3000/?from_twitter=true', { linkMode: 'authorize' });
  const {
    url,
    codeVerifier = '',
    state: sessionState = '',
  } = TWclientV2.generateOAuth2AuthLink(
    'https://localhost:3000/?from_twitter=true',
    { scope: ['tweet.read', 'tweet.write', 'users.read'] }
  );

  saveTempTokens(req.user.id, { codeVerifier, sessionState });
  res.send(url);
});
router.get('/auth/callback', async (req, res) => {
  try {
    const { state, code } = req.query;
    // Get the saved codeVerifier from session
    const { codeVerifier, sessionState } = await getTempTokens(req.user.id);
    if (codeVerifier === null || sessionState === null)
      throw Error('No Twitter Token');

    if (!codeVerifier || !state || !sessionState || !code) {
      return res
        .status(400)
        .send('You denied the app or your session expired!');
    }
    if (state !== sessionState) {
      return res.status(400).send('Stored tokens didnt match!');
    }

    // Obtain access token

    TWclientV2.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: 'https://localhost:3000/?from_twitter=true',
    })
      .then(
        async ({
          client: loggedClient,
          accessToken,
          refreshToken,
          expiresIn,
        }) => {
          saveNetworkTokens(req.user.id, { twitterToken: accessToken });
          // {loggedClient} is an authenticated client in behalf of some user
          // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
          // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)
        }
      )
      .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.get('/profile/twitter', async (req, res) => {
  try {
    const networkTokens = await getNetworkTokensByUser(req.user.id);
    if (networkTokens.twitterToken === null) throw Error('No Twitter Token');
    const client = new TwitterApi(networkTokens.twitterToken);
    client.v2
      .me()
      .then(({ data }) => {
        res.send(data);
      })
      .catch((err) => {
        saveNetworkTokens(req.user.id, { twitterToken: null });
        res
          .status(400)
          .send('a ocurrido un error, posiblemente se haya cerrado la sesion');
        console.log(err);
      });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.post('/create-tweet', async (req, res) => {
  try {
    const networkTokens = await getNetworkTokensByUser(req.user.id);
    if (networkTokens.twitterToken === null) throw Error('No Twitter Token');
    const client = new TwitterApi(networkTokens.twitterToken);
    const mediaId = await client.v1.uploadMedia(req.body.file);
    const tweet = {
      ...(mediaId !== null ? { media: { media_ids: [mediaId] } } : {}),
    };
    client.v2
      .tweet(req.body.msg, {
        ...tweet,
      })
      .then(({ data: createdTweet }) => {
        res.send(createdTweet);
      })
      .catch((err) => {
        saveNetworkTokens(req.user.id, { twitterToken: null });
        res.status(400)
          .send('a ocurrido un error, posiblemente se haya cerrado la sesion');
        console.log(err);
      });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

export default router;
