import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/routes/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('register')
  register(@Body() createAuthDto: any) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('login')
  login(@Body() createAuthDto: any) {
    return this.authService.login(createAuthDto);
  }

}
