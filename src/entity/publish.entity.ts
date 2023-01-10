import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    Relation,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Media } from './media.entity.js';
  import { User } from './user.entity.js';
  
  @Entity()
  export class Publish {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    network: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    start_date: Date;

    @Column({ nullable: true })
    end_date: Date;
  
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

    @OneToMany(() => Media, (media) => media.publish)
    @JoinColumn()
    media: Relation<Media>;
  }
  