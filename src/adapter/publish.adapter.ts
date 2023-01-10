import { Publish } from '../entity/publish.entity.js';
import { publishRepository } from '../repository/publish.repository.js';
import { getImage } from './media.adapter.js';
import { getUser } from './user.adapter.js';

const save = async (userId, data) => {
  let publish = new Publish();
  publish = { ...data };
  publish.user = await getUser(userId);
  publish.media = await getImage(data.fileId);
  return publishRepository.save(publish);
};

const getByUser = async (userId) => {
  const publish: Publish = await publishRepository
    .createQueryBuilder('publish')
    .where('publish.userId = :userId', { userId })
    .getOne();
  if (!publish) throw Error('data no encontrada');

  return publish;
};

const put = async (publishId, data) => {
  const updatePublish = await publishRepository.findOneBy({ id: publishId });
  if (!updatePublish) throw Error('id no encontrado');
  updatePublish.description = data.description;
  updatePublish.start_date = data.start_date;
  updatePublish.end_date = data.end_date;

  const { id, media, start_date, end_date } = await publishRepository.save(updatePublish);

  return {
    id,
    media,
    start_date,
    end_date,
  };
};

export { save, getByUser, put };
