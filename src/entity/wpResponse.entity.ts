import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WpResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  replyMessage: string[];

  @Column()
  trigger: string;
}
