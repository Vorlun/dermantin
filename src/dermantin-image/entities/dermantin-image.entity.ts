import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';

@ObjectType()
@Entity('dermantin_images')
export class DermantinImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, dermantin => dermantin.images)
  @JoinColumn({ name: 'dermantin_id' })
  dermantin: Dermantin;

  @Column()
  dermantin_id: number;

  @Field()
  @Column()
  image_url: string;

  @Field()
  @Column({ default: false })
  is_main: boolean;
}
