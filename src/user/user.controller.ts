import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/routes/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

}
