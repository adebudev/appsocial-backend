import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    Relation,
    JoinColumn
  } from 'typeorm';
import { User } from './user.entity.js';

  @Entity()
  export class Member {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column()
    type: string;
  
    @Column()
    start_date: Date;
  
    @Column()
    exp_date: Date;


    @ManyToOne(() => User, (user) => user.Member)
    @JoinColumn()
    user: Relation<User>;
  }
  