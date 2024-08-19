import { User } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'occurrences' })
export class Occurrence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ name: 'sub_category' })
  subCategory: string;

  @Column()
  affectedArea: string;

  @Column({ name: 'is_resolved', default: false })
  isResolved: boolean;

  @ManyToOne(() => User, (user) => user.occurrences)
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
