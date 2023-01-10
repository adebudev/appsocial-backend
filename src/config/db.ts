import { config } from 'dotenv';
config(); // initialize env variables

import { DataSource } from 'typeorm';
import { Contact } from '../entity/contact.entity.js';
import { User } from '../entity/user.entity.js';
import { WpBot } from '../entity/wpBot.entity.js';
import { WpGroup } from '../entity/wpGroup.entity.js';
import { Support } from '../entity/support.js';
import { Member } from '../entity/member.entity.js';

export const DBSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOSTNAME,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [User, Contact, WpBot, WpGroup, Support, Member],
  logging: false,
  synchronize: true,
});
