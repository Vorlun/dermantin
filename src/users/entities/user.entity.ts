import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { UserLang, UserRegion, UserRole } from 'src/enum/user.enum';
import { History } from 'src/histories/entities/history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @HideField()
  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @Field(() => Boolean)
  @Column({ default: false })
  is_verified: boolean;

  @Field(() => UserRegion, { nullable: true })
  @Column({ type: 'enum', enum: UserRegion, nullable: true })
  region?: UserRegion;

  @Field(() => UserLang, { nullable: true })
  @Column({ type: 'enum', enum: UserLang, default: UserLang.UZ })
  lang: UserLang;

  @HideField()
  @Column({ nullable: true })
  verificationToken?: string;

  @HideField()
  @Column({ nullable: true })
  resetPasswordOtp?: string;

  @HideField()
  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(()=>History, history=>history.user)
  histories: History[]
}
