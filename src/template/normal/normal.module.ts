import { Module } from '@nestjs/common';
import { UserNormalService } from './normal.service';
import { UserNormalController } from './normal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntities, UserSchema } from 'src/entities/user_normal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntities]),
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user',
      },
    ]),
  ],
  controllers: [UserNormalController],
  providers: [UserNormalService],
})
export class UserNormalModule {}
