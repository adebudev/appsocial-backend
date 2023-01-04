import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation,
  OneToMany,
} from 'typeorm';
import { WpBot } from './wpBot.entity.js';
import { WpGroup } from './wpGroup.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: 'email', length: 300, nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  rol: string; // TODO: ROLES: ROOT, ADMIN, USER

  @OneToMany(() => WpGroup, (WpGroup) => WpGroup.user)
  WpGroup: Relation<WpGroup>;

  @OneToOne(() => WpBot, (wpBot) => wpBot.user)
  wpBot: Relation<WpBot>;
}
