import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Relation,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
import { User } from './user.entity.js';
  
  @Entity()
  export class Support {
    @PrimaryGeneratedColumn('uuid') 
    id: string;
  
    @Column()
    title: String;
  
    @Column()
    description: string;

    @Column()
    state: String;

    @Column({nullable: true})
    start_date: Date;

    @Column({nullable: true})
    end_date: Date;


    @ManyToOne(() => User, (user) => user.support)
    @JoinColumn()
    user: Relation<User>;


  }