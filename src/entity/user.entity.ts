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
import { Post } from './post.entity.js';

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

  @OneToMany(() => Member, (member) => member.user)
  member: Relation<Member>;

  @OneToMany(() => Post, (post) => post.user)
  post: Relation<Post>;
}
