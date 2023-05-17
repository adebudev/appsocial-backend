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
  export class NetworkTokens {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    facebookToken: string;

    @Column({ nullable: true })
    instagramToken: string;

    @Column({ nullable: true })
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

    @OneToOne(() => User, (user) => user.tokens)
    @JoinColumn()
    user: Relation<User>;
  }
  