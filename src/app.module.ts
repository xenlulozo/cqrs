import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersModule } from './abc/user.subscriber.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntities, UserSchema } from './entities/user_normal.entity';
import { queryHandler } from './template/cqrs/application/handler';
import { UserResolver } from './template/cqrs/cqrs.resolver';
import { UserNormalModule } from './template/normal/normal.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'write',
      entities: [UserEntities],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user',
      },
    ]),
    SubscribersModule,
    CqrsModule,
    ConfigModule.forRoot(),
    UserNormalModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, ...queryHandler],
})
export class AppModule {}
