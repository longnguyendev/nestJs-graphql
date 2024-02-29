import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthInput } from './dto/login-auth.input';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginAuthInput: LoginAuthInput) {
    console.log(loginAuthInput);
    return this.authService.singIn(loginAuthInput);
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
