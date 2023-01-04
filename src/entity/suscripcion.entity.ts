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
  export class Suscription {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column()
    Type: String;
  
    @Column()
    start_date: Date;
  
    @Column()
    exp_date: Date;


    @ManyToOne(() => User, (user) => user.suscription)
    @JoinColumn()
    user: Relation<User>;


    

  }
  