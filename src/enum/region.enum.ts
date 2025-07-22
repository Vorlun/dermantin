import { registerEnumType } from '@nestjs/graphql';

export enum Region {
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

registerEnumType(Region, { name: 'Region' });
