import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    Relation,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './user.entity.js';
  
  @Entity()
  export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    media: string;

    @Column({ nullable: true })
    postDate: Date;
  
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
  