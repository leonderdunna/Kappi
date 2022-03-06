import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cards } from './cards/card.entity';
import { Package } from './packages/package.entity';
import { CardsModule } from './cards/cards.module';
import { PackagesModule } from './packages/packages.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { UsersModule } from './users/users.module';
import { Stats } from './stats/stats.entity';

import { StatsModule } from './stats/stats.module';
import { SettingsController } from './settings/settings.controller';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'karteikarten',
      entities: [Cards, Package,User,Stats],
      synchronize: true
    }),
    CardsModule,
    PackagesModule,
    UserModule,
    UsersModule,
    StatsModule,
    
  ],
  providers: [],
  controllers: [SettingsController],

})
export class AppModule { }
