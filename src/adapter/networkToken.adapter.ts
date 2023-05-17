import { NetworkTokens } from '../entity/NetworkTokens.entity.js';
import { networkTokenRepository } from '../repository/networkToken.repository.js';
import { getUser } from './user.adapter.js';

const saveNetworkTokens = async (userId, data) => {
  const getNetworks: NetworkTokens = await networkTokenRepository
    .createQueryBuilder('networkTokens')
    .where('networkTokens.userId = :userId', { userId })
    .getOne();
  const user = await getUser(userId);
  let networks = null;

  if (getNetworks === null) {
    let saveNetwork = new NetworkTokens();
    saveNetwork = { ...data };
    saveNetwork.user = user;
    networks = networkTokenRepository.save(saveNetwork);
  } else {
    getNetworks.facebookToken = data.facebookToken;
    getNetworks.instagramToken = data.instagramToken;
    getNetworks.twitterToken = data.twitterToken;

    networks = networkTokenRepository.save(getNetworks);
  }
  return networks;
};

const getNetworkTokensByUser = async (userId) => {
  const network = await networkTokenRepository
    .createQueryBuilder('networkTokens')
    .where('networkTokens.userId = :userId', { userId })
    .getOne();

  if (!network) throw Error('data no encontrada');
  return network;
};

const updateNetworkTokens = () => {
  return;
};

export { getNetworkTokensByUser, saveNetworkTokens };
