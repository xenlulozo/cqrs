import { Module } from '@nestjs/common';
import { UserSubscriber } from './user.subscriber';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/entities/user_normal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user',
      },
    ]),
  ],
  providers: [UserSubscriber],
})
export class SubscribersModule {}
