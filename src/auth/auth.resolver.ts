import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginAuthInput } from './dto/login-auth.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, { name: 'signIn' })
  async singIn(@Args('loginAuthInput') loginAuthInput: LoginAuthInput) {
    return this.authService.singIn(loginAuthInput);
  }
}
