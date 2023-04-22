import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Relation,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity.js';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  state: boolean;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  exp_date: Date;

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

  @OneToOne(() => User, (user) => user.member)
  @JoinColumn()
  user: Relation<User>;
}
