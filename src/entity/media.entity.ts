import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Publish } from './publish.entity.js';
import { User } from './user.entity.js';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  type: string;

  @Column()
  originalName: string;

  @Column()
  size: string;

  @Column()
  url: string;

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

  @ManyToOne(() => User, (user) => user.media)
  user: Relation<User>;

  @ManyToMany(() => Publish, (publish) => publish.images)
  publish: Relation<Publish[]>;
}
