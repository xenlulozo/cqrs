import { CreateUserInput } from './create-user-graphql.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserGraphqlInput extends PartialType(CreateUserInput) {
  id: number;
}
