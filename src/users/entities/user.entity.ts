import { Field, ObjectType, registerEnumType, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  CLIENT = 'client',
  CUSTOMER = 'customer',
}

export enum UserRegion {
  TASHKENT_CITY = 'Toshkent shahar',
  TASHKENT = 'Toshkent viloyati',
  SAMARKAND = 'Samarqand',
  BUKHARA = 'Buxoro',
  ANDIJAN = 'Andijon',
  FERGANA = 'Fargʻona',
  NAMANGAN = 'Namangan',
  SURKHANDARYA = 'Surxondaryo',
  KASHKADARYA = 'Qashqadaryo',
  JIZZAKH = 'Jizzax',
  NAVOI = 'Navoiy',
  KHOREZM = 'Xorazm',
  SIRDARYA = 'Sirdaryo',
  KARAKALPAKSTAN = 'Qoraqalpogʻiston',
}

export enum UserLang {
  EN = 'en',
  RU = 'ru',
  UZ = 'uz',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(UserRegion, { name: 'UserRegion' });
registerEnumType(UserLang, { name: 'UserLang' });

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

  @Column({ nullable: true })
  verificationToken?: string;

  @Column({ nullable: true })
  resetPasswordOtp?: string;

  @Column({ nullable: true })
  refreshToken?: string;
}
