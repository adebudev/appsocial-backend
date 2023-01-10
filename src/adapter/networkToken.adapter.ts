import { NetworkTokens } from '../entity/NetworkTokens.entity.js';
import { networkTokenRepository } from '../repository/networkToken.repository.js';
import { getUser } from './user.adapter.js';

const saveNetworkTokens = async (userId, data) => {
  let publish = new NetworkTokens();
  publish = { ...data };
  publish.user = await getUser(userId);
  return networkTokenRepository.save(publish);
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
}

export { getNetworkTokensByUser, saveNetworkTokens };
