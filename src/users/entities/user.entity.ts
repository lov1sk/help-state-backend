import { Occurrence } from '@/occurrence/entities/occurrence.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'user_name', unique: true })
  userName: string;

  @Column({ name: 'pass' })
  password: string;

  @Column()
  uf: string;

  @OneToMany(() => Occurrence, (occurrence) => occurrence.user)
  occurrences: Occurrence[];
  @Column()
  type: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
