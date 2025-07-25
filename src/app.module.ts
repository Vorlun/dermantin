import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './category/category.module';
import { StoresModule } from './store/store.module';
import { DermantinsModule } from './dermantin/dermantin.module';
import { DermantinImagesModule } from './dermantin-image/dermantin-image.module';
import { AdvertisementsModule } from './advertisement/advertisement.module';
import { ReviewsModule } from './review/review.module';
import { HistoriesModule } from './histories/histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        type:"postgres",
        host:configService.get<string>("DB_HOST"),
        port:configService.get<number>("DB_PORT"),
        username:configService.get<string>("DB_USERNAME"),
        password:configService.get<string>("DB_PASSWORD"),
        database:configService.get<string>("DB_DATABASE"),
        autoLoadEntities:true,
        synchronize:true,
        logging:true
      })
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),

    AdminsModule,

    UsersModule,

    MailModule,

    AuthModule,

    CategoriesModule,

    StoresModule,

    DermantinsModule,

    DermantinImagesModule,

    AdvertisementsModule,

    ReviewsModule,

    HistoriesModule,
  ]
})
export class AppModule {}
