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
import { Publish } from './publish.entity.js';
  
  @Entity()
  export class Media {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
  
    @ManyToOne(() => Publish, (publish) => publish.media)
    @JoinColumn()
    publish: Relation<Publish>;
  }
  