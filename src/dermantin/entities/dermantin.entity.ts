import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Store } from 'src/store/entities/store.entity';
import { Category } from 'src/category/entities/category.entity';
import { DermantinImage } from 'src/dermantin-image/entities/dermantin-image.entity';
import { Advertisement } from 'src/advertisement/entities/advertisement.entity';
import { Review } from 'src/review/entities/review.entity';
import { History } from 'src/histories/entities/history.entity';

@ObjectType()
@Entity('dermantins')
export class Dermantin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.dermantins)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column()
  store_id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('decimal')
  price: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  class?: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.dermantins)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: number;

  @Field(() => [DermantinImage], { nullable: true })
  @OneToMany(() => DermantinImage, (image) => image.dermantin)
  images?: DermantinImage[];

  @Field(() => [Advertisement], { nullable: true })
  @OneToMany(() => Advertisement, (ad) => ad.dermantin)
  advertisements?: Advertisement[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.dermantin)
  reviews?: Review[];

  @OneToMany(() => History, (history) => history.dermantin)
  histories: History[];
}
