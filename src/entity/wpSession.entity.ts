import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WpSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  session_id: string;
}
