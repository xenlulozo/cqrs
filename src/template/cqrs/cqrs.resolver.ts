import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCommand } from './domain/impl/createUser.command';
import { GetUserQuery } from './domain/impl/getUser.query';
import {
  CreateUserResponse,
  UserResponse,
} from './infrastructure/type/user.type';
import { CreateUserInput } from './infrastructure/dto/create-user-graphql.input';

@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => CreateUserResponse, { name: 'createUser' })
  async create(
    @Args('body')
    createUserInput: CreateUserInput,
  ) {
    return await this.commandBus.execute(
      new CreateUserCommand(createUserInput),
    );
  }

  @Query(() => UserResponse, { name: 'getDataUser' })
  async find(@Args('id') id: number) {
    return await this.queryBus.execute(
      new GetUserQuery({ user_id: +id }, 'GET_DATA'),
    );
  }
}
