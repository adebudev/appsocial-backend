import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Relation,
} from 'typeorm';
import { User } from './user.entity.js';

@Entity()
export class WpBot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  life: boolean;

  @OneToOne(() => User, (user) => user.wpBot)
  @JoinColumn()
  user: Relation<User>;
}
