import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, UserEntities } from 'src/entities/user_normal.entity';
import { DataSource } from 'typeorm';
import { CreateUserNormalDto } from './dto/create-user_normal.dto';

@Injectable()
export class UserNormalService {
  constructor(
    private dataSource: DataSource,
    @InjectModel('user') private userModel: Model<UserModel>,
  ) {}

  async create(createUserNormalDto: CreateUserNormalDto) {
    const user = await this.userModel
      .findOne({
        user_name: createUserNormalDto.user_name,
      })
      .exec();

    if (user) throw new HttpException('error', HttpStatus.BAD_REQUEST);

    await this.dataSource.getRepository(UserEntities).insert(
      this.dataSource.getRepository(UserEntities).create({
        password: createUserNormalDto.password,
        user_name: createUserNormalDto.user_name,
      }),
    );
  }

  async findOne(id: number) {
    const user = await this.userModel
      .findOne({
        user_id: id,
      })
      .exec();

    if (!user) throw new HttpException('error', HttpStatus.BAD_REQUEST);
    return user;
  }
}
