import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, UserEntities } from 'src/entities/user_normal.entity';

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntities> {
  constructor(
    dataSource: DataSource,
    @InjectModel('user') private userModel: Model<UserModel>,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return UserEntities;
  }

  afterInsert(event: InsertEvent<UserEntities>): void | Promise<any> {
    const createdCat = new this.userModel(event.entity);
    createdCat.save();
  }
}
