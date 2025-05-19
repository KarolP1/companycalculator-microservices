import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  createUserMessagePattern,
  getUserByEmailMessagePattern,
  getUserByIdMessagePattern,
  updateUserMessagePattern,
  changePasswordMessagePattern,
  deleteUserMessagePattern,
  updateRolesMessagePattern,
  getUsersInRestaurantMessagePattern
} from '@cc/common';
import { CreateUserDto, UserRole } from 'libs/common/src/entities';
import { updateUserDto } from 'libs/common/src/entities/user/dtos/update_user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern(createUserMessagePattern)
  async createUser(data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @MessagePattern(getUserByEmailMessagePattern)
  async getUserByEmail(data: { email: string }) {
    console.log(data)
    return this.usersService.getUserByEmail(data.email);
  }

  @MessagePattern(getUserByIdMessagePattern)
  async getUserById(data: { userId: string }) {
    return this.usersService.getUserById(data.userId);
  }

  @MessagePattern(updateUserMessagePattern)
  async updateUser(data: { id: string, dto: updateUserDto }) {
    return this.usersService.updateUser(data.id, data.dto);
  }

  @MessagePattern(changePasswordMessagePattern)
  async changePassword(data: { userId: string, oldPassword: string, newPassword: string }) {
    return this.usersService.changePassword(data.userId, data.oldPassword, data.newPassword);
  }

  @MessagePattern(deleteUserMessagePattern)
  async deleteUser(data: { userId: string }) {
    return this.usersService.deleteUser(data.userId);
  }

  @MessagePattern(updateUserMessagePattern)
  async updateRoles(data: { userId: string, roles: UserRole[] }) {
    return this.usersService.updateRoles(data.userId, data.roles);
  }

  @MessagePattern(getUsersInRestaurantMessagePattern)
  async getUsersInRestaurant(data: { restaurantId: string }) {
    return this.usersService.getUsersInRestaurant(data.restaurantId);
  }
}
