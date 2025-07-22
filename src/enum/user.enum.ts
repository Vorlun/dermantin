import { registerEnumType } from '@nestjs/graphql';

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
