import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('admins')
export class Admin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  full_name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @HideField()
  @Column()
  password: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;

  @Field()
  @Column({ default: false })
  is_creator: boolean;

  @HideField()
  @Column({ nullable: true, type: 'text' })
  refresh_token?: string | null;
}
