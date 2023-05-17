import {
  getNetworkTokensByUser,
  saveNetworkTokens,
} from '../adapter/networkToken.adapter.js';

const networkTokensRegister = async (req, res) => {
  try {
    const response = await saveNetworkTokens(req.user.id, req.body);
    res.status(201).send(response);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const getNetworkTokens = async (req, res) => {
  try {
    const response = await getNetworkTokensByUser(req.user.id.userId);
    res.status(201).send(response);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

export { networkTokensRegister, getNetworkTokens };
