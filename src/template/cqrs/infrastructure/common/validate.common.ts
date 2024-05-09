import { HttpException } from '@nestjs/common';

export class ValidateCommon {
  public static validate = {
    ['GET_DATA']: (data) => {
      if (!!data == false) throw new HttpException('User does not exist', 400);
    },

    ['VALIDATE']: (data) => {
      if (!!data == true)
        throw new HttpException('UserName already exist', 400);
    },
  };
}
