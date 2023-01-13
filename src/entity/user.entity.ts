import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WpBot } from './wpBot.entity.js';
import { WpGroup } from './wpGroup.entity.js';
import { Support } from './support.js';
import { Member } from './member.entity.js';
import { Publish } from './publish.entity.js';
import { Banking } from './banking.entity.js';
import { WpMessage } from './wpMessage.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true, unique: true })
  cellular: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  born: Date;

  @Column({ nullable: true })
  address: string;

  @Column()
  identification: string;

  @Column()
  identificationType: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'email', length: 300, nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  rol: string; // TODO: ROLES: ROOT, ADMIN, USER

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

  @OneToMany(() => WpGroup, (wpGroup) => wpGroup.user)
  wpGroup: Relation<WpGroup>;

  @OneToOne(() => WpBot, (wpBot) => wpBot.user)
  wpBot: Relation<WpBot>;

  @OneToMany(() => Support, (support) => support.user)
  support: Relation<Support>;

  @OneToOne(() => Member, (member) => member.user)
  member: Relation<Member>;

  @OneToMany(() => Publish, (publish) => publish.user)
  publish: Relation<Publish>;

  @OneToOne(() => Banking, (banking) => banking.user)
  banking: Relation<Banking>;

  @OneToMany(() => WpMessage, (messages) => messages.user)
  messages: Relation<WpMessage>;
}
