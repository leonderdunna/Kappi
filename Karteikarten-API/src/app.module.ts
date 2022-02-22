import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsController } from './cards/cards.controller';
import { UsersController } from './users/users.controller';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PackagesController } from './packages/packages.controller';
import { CardsService } from './cards/cards.service';
import { PackagesService } from './packages/packages.service';
import { Cards } from './cards/card.entity';
import { Package } from './packages/package.entity';
import { CardsModule } from './cards/cards.module';
import { PackagesModule } from './packages/packages.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { UsersModule } from './users/users.module';
import { Stats } from './user/stats.entity';


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
    
  ],

})
export class AppModule { }
