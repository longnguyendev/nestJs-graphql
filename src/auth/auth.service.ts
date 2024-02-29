import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UpdateAuthInput } from './dto/update-auth.input';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthInput } from './dto/login-auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async singIn(loginAuthInput: LoginAuthInput): Promise<any> {
    console.log(loginAuthInput);
    const user = await this.usersService.findOne(loginAuthInput.email);
    if (user?.password !== loginAuthInput.password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, name: user.firstName + ' ' + user.lastName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
