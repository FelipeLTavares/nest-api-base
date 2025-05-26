import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/routes/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  findAll() {
    return this.userService.findAll();
  }

}
