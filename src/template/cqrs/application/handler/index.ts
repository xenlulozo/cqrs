import { CreateUserHandler } from './createUser.handler';
import { GetUserHandler } from './getUser.handler';

export const queryHandler = [GetUserHandler, CreateUserHandler];
