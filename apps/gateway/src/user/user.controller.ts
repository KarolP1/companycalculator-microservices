import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientProxy } from '@nestjs/microservices';
import {
  createUserMessagePattern,
  getUserByEmailMessagePattern,
  getUserByIdMessagePattern,
  updateUserMessagePattern,
  deleteUserMessagePattern,
  getUsersInRestaurantMessagePattern,
} from '@cc/common';
import { CreateUserDto } from 'libs/common/src/entities';
import { updateUserDto } from 'libs/common/src/entities/user/dtos/update_user.dto';


@Controller('user')
export class UserController {

  logger = new Logger(UserController.name);
  constructor(

    private readonly userService: UserService,
    @Inject('USERS_SERVICE') private client: ClientProxy
  ) { }

  @Get()
  getTest() {
    this.logger.log('get Hello World from user service!');

    return "Hello World from user service!";
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    this.logger.log('post Hello World from user service!');

    return this.client.send(createUserMessagePattern, dto);
  }

  @Get('email/:email')
  getByEmail(@Param('email') email: string) {
    return this.client.send(getUserByEmailMessagePattern, email);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.client.send(getUserByIdMessagePattern, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: updateUserDto) {
    return this.client.send(updateUserMessagePattern, { id, dto });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.client.send(deleteUserMessagePattern, id);
  }

  @Get('restaurant/:restaurantId')
  getUsersInRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.client.send(getUsersInRestaurantMessagePattern, restaurantId);
  }

}
