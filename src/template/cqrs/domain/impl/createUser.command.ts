import { CreateUserNormalDto } from 'src/template/normal/dto/create-user_normal.dto';

export class CreateUserCommand {
  constructor(public readonly data: CreateUserNormalDto) {}
}
