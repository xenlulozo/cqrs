import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  user_name: string;

  @Field()
  password: string;
}
