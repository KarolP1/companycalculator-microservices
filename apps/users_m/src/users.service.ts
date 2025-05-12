import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, User } from 'libs/common/src/entities';
import { updateUserDto } from 'libs/common/src/entities/user/dtos/update_user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  getTest(): string {
    return `Hello World from user service!`;
  }

  // Create a new user
  async createUser(createUserDto: CreateUserDto) {
    const { email, passwordHash, roles, restaurantId } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email, });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // Create the new user
    const newUser = new this.userModel({
      email,
      passwordHash: hashedPassword,
      roles: roles || ['employee'],  // Default role if not provided
      restaurantId,
    });

    // Save to the database
    await newUser.save();
    return { message: 'User created successfully', user: newUser };
  }

  // Get user by email
  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Get user by ID
  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update user details
  async updateUser(userId: string, updateUserDto: updateUserDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update fields
    Object.assign(user, updateUserDto);

    // Save updated user
    await user.save();
    return { message: 'User updated successfully', user };
  }

  // Change user password
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.passwordHash = hashedPassword;
    await user.save();
    return { message: 'Password changed successfully' };
  }

  // Delete a user
  async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.deleteOne();
    return { message: 'User deleted successfully' };
  }

  // Update user roles
  async updateRoles(userId: string, roles: string[]) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user roles
    user.roles = roles;
    await user.save();
    return { message: 'User roles updated successfully', user };
  }

  // Get all users in a restaurant (example for a specific restaurant)
  async getUsersInRestaurant(restaurantId: string) {
    const users = await this.userModel.find({ restaurantId });
    if (!users.length) {
      throw new NotFoundException('No users found in this restaurant');
    }
    return users;
  }
}
