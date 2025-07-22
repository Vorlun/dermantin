import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity('reviews')
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, dermantin => dermantin.reviews)
  @JoinColumn({ name: 'dermantin_id' })
  dermantin: Dermantin;

  @Column()
  dermantin_id: number;

  @Field(() => Float)
  @Column('decimal')
  ranking: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;
}
