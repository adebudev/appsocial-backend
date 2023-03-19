import { getToken, postTweet } from '../adapter/twitter.adapter.js';

const PublishTweet = async (req, res) => {
  try {
    const response = await postTweet(req.body);
    res.status(200).send({
      message: 'success',
      status: 200,
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
};

const twitterToken = async (req, res) => {
  try {
    const response = await getToken();
    res.status(200).send({
      message: 'success',
      status: 200,
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: error.message,
      status: 400,
    });
  }
};

export { PublishTweet, twitterToken };
