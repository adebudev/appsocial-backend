import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { WpMessage } from './wpMessage.entity.js';

@Entity()
export class WpReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column('text', { array: true })
  replyMessage: string[];

  @Column()
  trigger: string;

  @ManyToOne(() => WpMessage, (message) => message.reply)
  message: Relation<WpMessage>;
}
