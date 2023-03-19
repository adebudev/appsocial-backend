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
  export class NetworkTokens {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    facebookToken: string;

    @Column()
    instagramToken: string;

    @Column()
    twitterToken: string;
  
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

    @ManyToOne(() => User, (user) => user.tokens)
    @JoinColumn()
    user: Relation<User>;
  }
  