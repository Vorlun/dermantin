import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';

@ObjectType()
@Entity('advertisements')
export class Advertisement {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, dermantin => dermantin.advertisements)
  @JoinColumn({ name: 'dermantin_id' })
  dermantin: Dermantin;

  @Column()
  dermantin_id: number;

  @Field()
  @Column('int')
  discount_percent: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column({ default: false })
  status: boolean;

  @Field(() => Date)
  @Column()
  start_date: Date;

  @Field(() => Date)
  @Column()
  end_date: Date;
}
