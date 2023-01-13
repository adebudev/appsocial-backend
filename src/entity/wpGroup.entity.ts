import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from './contact.entity.js';
import { User } from './user.entity.js';

@Entity()
export class WpGroup {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
  
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
  
  @ManyToOne(() => User, (user) => user.wpGroup)
  user: Relation<User>;

  @ManyToMany(() => Contact, (contacts) => contacts.wpGroup)
  @JoinTable()
  contacts: Relation<Contact[]>;
}
