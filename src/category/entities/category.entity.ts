import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';

@ObjectType()
@Entity('categories')
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logo?: string;

  @Field(() => [Dermantin], { nullable: true })
  @OneToMany(() => Dermantin, dermantin => dermantin.category)
  dermantins?: Dermantin[];
}
