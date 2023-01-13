import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Relation,
    OneToOne,
  } from 'typeorm';
import { User } from './user.entity.js';
  
  @Entity()
  export class Banking {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;

    @Column()
    titular: string;
  
    @Column()
    number: string;

    @Column()
    type: string;
  
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
  
    @OneToOne(() => User, (user) => user.banking)
    user: Relation<User[]>;
  }
  