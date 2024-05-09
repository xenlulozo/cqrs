import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserNormalDto } from './dto/create-user_normal.dto';
import { UserNormalService } from './normal.service';

@Controller('user-normal')
export class UserNormalController {
  constructor(private readonly userNormalService: UserNormalService) {}

  @Post()
  create(@Body() createUserNormalDto: CreateUserNormalDto) {
    return this.userNormalService.create(createUserNormalDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userNormalService.findOne(+id);
  }
}
