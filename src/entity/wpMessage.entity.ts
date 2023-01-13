import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { User } from './user.entity.js';

@Entity()
export class WpMessage {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  type: string;

  @Column('text', { array: true })
  reply: string[];

  @Column('text', { array: true, nullable: true })
  media: string[];

  @Column({ nullable: true })
  status: string;

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

  @ManyToOne(() => User, (user) => user.publish)
  @JoinColumn()
  user: Relation<User>;
}
