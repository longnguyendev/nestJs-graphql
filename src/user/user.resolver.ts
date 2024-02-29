import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Auth } from 'src/auth/entities/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.auth.guard';
import { CurrentUser } from './user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation(() => Auth)
  async createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    const user = await this.userService.findOne(createUserInput.email);
    if (user) {
      throw new HttpException('user aready exit', HttpStatus.FORBIDDEN);
    }
    const curentuser = await this.userService.create(createUserInput);
    if (curentuser) {
      return this.authService.singIn({
        email: createUserInput.email,
        password: createUserInput.password,
      });
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  getUserByEmail(@Args('email') email: string) {
    return this.userService.findOne(email);
  }

  @Query(() => User)
  getUserById(@Args('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Query(() => User)
  error() {
    return this.userService.error();
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  currentUser(@CurrentUser() user: User) {
    return this.userService.findOneById(user.id);
  }
}
