import { DBSource } from '../config/db.js';
import { Suscription } from '../entity/suscripcion.entity.js';

export const suscriptionRepository = DBSource.getRepository(Suscription);