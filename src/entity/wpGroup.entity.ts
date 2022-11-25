import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Contact } from './contact.entity.js';
import { User } from './user.entity.js';

@Entity()
export class WpGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.wpBot)
  user: Relation<User>;

  @ManyToMany(() => Contact) // note: we will create author property in the Photo class below
  @JoinTable()
  contacts: Contact[];
}
