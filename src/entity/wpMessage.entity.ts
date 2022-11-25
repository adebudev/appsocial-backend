import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WpMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  keywords: string[];

  @Column()
  key: string;
}
