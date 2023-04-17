import { Publish } from '../entity/publish.entity.js';
import { publishRepository } from '../repository/publish.repository.js';
import { getImage } from './media.adapter.js';
import { getUser } from './user.adapter.js';

const getImages = async (images) => {
  if (images.length < 1) return [];
  return images.map(async (element) => {
    const media = await getImage(element);
    return media;
  });
};

const save = async (userId, data) => {
  let publish = new Publish();
  publish = { ...data };
  publish.user = await getUser(userId);
  const { id, images, start_date, end_date, interval } = await publishRepository.save(publish);
  return { id, images, start_date, end_date, interval };
};

const getByUser = async (userId) => {
  const publish: Publish = await publishRepository
    .createQueryBuilder('publish')
    .where('publish.userId = :userId', { userId })
    .getOne();
  if (!publish) throw Error('data no encontrada');

  return publish;
};

const getPublishById = async (id: string) => {
  const publish: Publish = await publishRepository.findOneBy({ id });
  if (!publish) throw Error('data no encontrada');

  return publish;
};

const put = async (publishId, data) => {
  const updatePublish = await publishRepository.findOneBy({ id: publishId });
  if (!updatePublish) throw Error('id no encontrado');
  updatePublish.description = data.description;
  updatePublish.start_date = data.start_date;
  updatePublish.end_date = data.end_date;

  const { id, images, start_date, end_date } = await publishRepository.save(
    updatePublish
  );

  return {
    id,
    images,
    start_date,
    end_date,
  };
};

export { save, getByUser, put, getPublishById };
