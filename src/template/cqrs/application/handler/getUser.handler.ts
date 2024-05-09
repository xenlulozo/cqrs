import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/entities/user_normal.entity';
import { GetUserQuery } from '../../domain/impl/getUser.query';
import { ValidateCommon } from '../../infrastructure/common/validate.common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@InjectModel('user') private userModel: Model<UserModel>) {}

  async execute(query: GetUserQuery): Promise<UserModel> {
    const user = await this.userModel.findOne(query.query).exec();

    ValidateCommon.validate[query.state](user);

    return user;
  }
}
