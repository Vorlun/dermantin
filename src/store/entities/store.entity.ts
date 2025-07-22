import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';
import { Region } from 'src/enum/region.enum';

@ObjectType()
@Entity('stores')
export class Store {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logo_url?: string;

  @Field(() => Region)
  @Column({ type: 'enum', enum: Region })
  region: Region;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rating?: number;

  @Field({ defaultValue: false })
  @Column({ default: false })
  status: boolean;

  @Field(() => [Dermantin], { nullable: true })
  @OneToMany(() => Dermantin, dermantin => dermantin.store)
  dermantins: Dermantin[];
}
