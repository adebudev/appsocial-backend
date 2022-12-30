import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Relation } from 'typeorm';
import { WpReply } from './wpResponse.entity.js';

@Entity()
export class WpMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  keywords: string[];

  @Column()
  key: string;

  @OneToMany(() => WpReply, (reply) => reply.message)
  @JoinColumn()
  reply: Relation<WpReply>;
}
