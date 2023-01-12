import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Relation, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WpReply } from './wpResponse.entity.js';

@Entity()
export class WpMessage {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  type: string;

  @Column('text', { array: true })
  caption: string[];

  @Column('text', { array: true })
  media: string[];

  @Column({ nullable: true })
  status: string;

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

  @OneToMany(() => WpReply, (reply) => reply.message)
  @JoinColumn()
  reply: Relation<WpReply>;
}
