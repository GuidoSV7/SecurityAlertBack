import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';


import { UsersModule } from './users/users.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { NotificationfcmModule } from './notificationfcm/notificationfcm.module';
import { TelegramModule } from './telegram/telegram.module';
import { ZonasVerdesModule } from './zonas-verdes/zonas-verdes.module';
import { FiresModule } from './firms/fires.module';




@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),  

    
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl: process.env.STAGE === 'prod'
              ? { rejectUnauthorized: false }
              : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,      
      autoLoadEntities: true,
      synchronize: true,
    }),


  //p

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    UsersModule,

    ComplaintsModule,

    NotificationfcmModule,

    TelegramModule,
    
    ZonasVerdesModule,
    
    FiresModule





  ],
})
export class AppModule {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
}
