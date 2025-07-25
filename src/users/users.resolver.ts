import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './input/create-user.input';
import { UpdateUserInput } from './input/update-user.input';
import { ChangeUserPasswordInput } from './input/change-password.input';
import { ForgotPasswordInput } from './input/forget-password.input';
import { ResetPasswordInput } from './input/reset-password.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('id', { type: () => Int }) id: number, @Args('updateUserInput') input: UpdateUserInput) {
    return this.usersService.update(id, input);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => String)
  verifyEmail(@Args('token') token: string) {
    return this.usersService.verifyEmail(token);
  }

  @Mutation(() => String)
  changeUserPassword(@Args('id', { type: () => Int }) id: number, @Args('changeUserPasswordInput') input: ChangeUserPasswordInput) {
    return this.usersService.changePassword(id, input);
  }

  @Mutation(() => String)
  forgotPassword(@Args('forgotPasswordInput') input: ForgotPasswordInput) {
    return this.usersService.forgotPassword(input);
  }

  @Mutation(() => String)
  resetPassword(@Args('resetPasswordInput') input: ResetPasswordInput) {
    return this.usersService.resetPassword(input);
  }
}
