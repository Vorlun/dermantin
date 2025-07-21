import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { CreateUserInput } from 'src/users/input/create-user.input';
import { CreateAdminInput } from 'src/admins/input/create-admin.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signupUser(@Args('input') input: CreateUserInput) {
    return this.authService.signupUser(input);
  }

  @Mutation(() => Admin)
  signupAdmin(@Args('input') input: CreateAdminInput) {
    return this.authService.signupAdmin(input);
  }

  @Mutation(() => String)
  async signinUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const tokens = await this.authService.signinUser(email, password);
    return tokens.accessToken;
  }

  @Mutation(() => String)
  async signinAdmin(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const tokens = await this.authService.signinAdmin(email, password);
    return tokens.accessToken;
  }

  @Mutation(() => Boolean)
  async signoutUser(@Args('userId') userId: number) {
    return this.authService.signoutUser(userId);
  }

  @Mutation(() => Boolean)
  async signoutAdmin(@Args('adminId') adminId: number) {
    return this.authService.signoutAdmin(adminId);
  }

  @Mutation(() => String)
  async refreshUser(
    @Args('userId') userId: number,
    @Args('refreshToken') refreshToken: string,
  ) {
    const tokens = await this.authService.refreshUser(userId, refreshToken);
    return tokens.accessToken;
  }

  @Mutation(() => String)
  async refreshAdmin(
    @Args('adminId') adminId: number,
    @Args('refreshToken') refreshToken: string,
  ) {
    const tokens = await this.authService.refreshAdmin(adminId, refreshToken);
    return tokens.accessToken;
  }
}
