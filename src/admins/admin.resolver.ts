import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './input/create-admin.input';
import { UpdateAdminInput } from './input/update-admin.input';
import { ChangePasswordInput } from './input/change-password.input';
import { AdminsService } from './admins.service';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminsService) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Query(() => [Admin], { name: 'admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAdminInput') updateAdminInput: UpdateAdminInput,
  ) {
    return this.adminService.update(id, updateAdminInput);
  }

  @Mutation(() => Admin)
  removeAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.remove(id);
  }

  @Mutation(() => String)
  changeAdminPassword(
    @Args('id', { type: () => Int }) id: number,
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    return this.adminService.changePassword(id, changePasswordInput);
  }
}
