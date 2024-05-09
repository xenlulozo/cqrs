import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field((type) => Int)
  user_id: number;

  @Field({ nullable: true })
  user_name: string;

  @Field({ nullable: true })
  password: string;
}

@ObjectType()
export class CreateUserResponse {
  @Field((type) => Int)
  user_id: number;
}
