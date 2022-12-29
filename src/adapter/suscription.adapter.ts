import { Suscription } from '../entity/suscripcion.entity.js';
import { suscriptionRepository } from '../repository/suscription.repository.js';

export const save = async (data) => {
  let suscrip = new Suscription();
  suscrip = { ...data };
  const response: Suscription= await suscriptionRepository.save(suscrip);

  return {
    id: response.id,
    title: response.start_date,
    description: response.exp_date,
  };
};