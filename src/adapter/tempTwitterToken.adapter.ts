import { DBSource } from '../config/db.js';
import { TempTwitterTokens } from '../entity/tempTwitterToken.entity.js';
import { getUser } from './user.adapter.js';

const tempTwitterTokenRepository = DBSource.getRepository(TempTwitterTokens);

const saveTempTokens = async (userId, data) => {
  const getTempTokens = await tempTwitterTokenRepository
    .createQueryBuilder('tempTwitterToken')
    .where('tempTwitterToken.userId = :userId', { userId })
    .getOne();

  let tempTokens = null;
  if (getTempTokens === null) {
    let saveTempTokens = new TempTwitterTokens();
    saveTempTokens = { ...data };
    saveTempTokens.user = await getUser(userId);
    tempTokens = tempTwitterTokenRepository.save(saveTempTokens);
  } else {
    getTempTokens.codeVerifier = data?.codeVerifier;
    getTempTokens.sessionState = data?.sessionState;
    tempTokens = tempTwitterTokenRepository.save(getTempTokens);
  }

  return tempTokens;
};

const getTempTokens = async (userId) => {
  const tempTwitterToken = await tempTwitterTokenRepository
    .createQueryBuilder('tempTwitterToken')
    .where('tempTwitterToken.userId = :userId', { userId })
    .getOne();
  if (!tempTwitterToken) throw Error('data no encontrada');
  
  return tempTwitterToken;
};

export { saveTempTokens, getTempTokens };
