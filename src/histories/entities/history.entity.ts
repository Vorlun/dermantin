import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class History {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.histories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.histories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dermantin_id' })
  dermantin: Dermantin;

  @Field()
  @CreateDateColumn()
  viewedAt: Date;
}
