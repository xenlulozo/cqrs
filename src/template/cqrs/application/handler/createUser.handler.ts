import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UserEntities } from 'src/entities/user_normal.entity';
import { DataSource } from 'typeorm';
import { CreateUserCommand } from '../../domain/impl/createUser.command';
import { GetUserQuery } from '../../domain/impl/getUser.query';
import { CreateUserResponse } from '../../infrastructure/type/user.type';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private dataSource: DataSource, private queryBus: QueryBus) {}
  async execute(body: CreateUserCommand): Promise<CreateUserResponse> {
    await this.queryBus.execute(
      new GetUserQuery({ user_name: body.data.user_name }, 'VALIDATE'),
    );

    const data = await this.dataSource.getRepository(UserEntities).insert(
      this.dataSource.getRepository(UserEntities).create({
        password: body.data.password,
        user_name: body.data.user_name,
      }),
    );

    return data.raw[0];
  }
}
