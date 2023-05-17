// import typeormStore from 'typeorm-store';

import { Session } from '../entity/session.entity.js';
import { DBSource } from './db.js';

const repository = DBSource.getRepository(Session);

export const configSession = {
    secret: 'networksharing',
    resave: false,
    saveUninitialized: false,
    // store: new typeormStore.TypeormStore({ repository }),
}