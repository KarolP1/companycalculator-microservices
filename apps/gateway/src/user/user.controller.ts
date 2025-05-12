import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  createUserMessagePattern,
  getUserByEmailMessagePattern,
  getUserByIdMessagePattern,
  updateUserMessagePattern,
  deleteUserMessagePattern,
  getUsersInRestaurantMessagePattern,
  changePasswordMessagePattern,
} from '@cc/common';
import { CreateUserDto, UserRole } from 'libs/common/src/entities';
import { updateUserDto } from 'libs/common/src/entities/user/dtos/update_user.dto';
import { handleMicroserviceError } from '@cc/error-handler';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) { }

  // Test endpoint //WORKS
  @Get('/test')
  getTest() {
    this.logger.log('GET /user/test');
    return 'Hello World from user service!';
  }

  // Create a new user //WORKS
  @Post()
  create(@Body() dto: CreateUserDto) {
    this.logger.log(`POST /user -> Creating user: ${dto.email}`);
    return handleMicroserviceError(
      this.client.send(createUserMessagePattern, dto),
    );
  }

  // Get user by email
  @Get('email/:email') // WORKS 
  getByEmail(@Param('email') email: string) {
    this.logger.log(`GET /user/email/${email}`);
    return handleMicroserviceError(
      this.client.send(getUserByEmailMessagePattern, { email }),
    );
  }

  // Get user by ID //WORKS
  @Get(':id')
  getById(@Param('id') id: string) {
    this.logger.log(`GET /user/${id}`);
    return handleMicroserviceError(
      this.client.send(getUserByIdMessagePattern, { userId: id }),
    );
  }

  // Update user by ID //WORKS
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: updateUserDto) {
    this.logger.log(`PATCH /user/${id}`);
    return handleMicroserviceError(
      this.client.send(updateUserMessagePattern, { id, dto }),
    );
  }

  // delete user by ID //WORKS
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.log(`DELETE /user/${id}`);
    return handleMicroserviceError(
      this.client.send(deleteUserMessagePattern, { userId: id }),
    );
  }

  // Change user password //WORKS
  @Patch(':id/password')
  changePassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    this.logger.log(`PATCH /user/${id}/password`);

    return handleMicroserviceError(
      this.client.send(changePasswordMessagePattern, {
        userId: id,
        oldPassword,
        newPassword,
      }),
    );
  }

  // Update user roles //WORKS
  @Patch(':id/roles')
  updateRoles(@Param('id') id: string, @Body("roles") roles: UserRole[]) {
    this.logger.log(`PATCH /user/${id}/roles`);
    return handleMicroserviceError(
      this.client.send(updateUserMessagePattern, { userId: id, roles }),
    )
  }


  // Get users in restaurant
  @Get('restaurant/:restaurantId')
  getUsersInRestaurant(@Param('restaurantId') restaurantId: string) {
    this.logger.log(`GET /user/restaurant/${restaurantId}`);
    return handleMicroserviceError(
      this.client.send(getUsersInRestaurantMessagePattern, {
        restaurantId,
      }),
    );
  }
}