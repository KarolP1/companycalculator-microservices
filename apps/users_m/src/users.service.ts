import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, User, UserRole } from 'libs/common/src/entities';
import { updateUserDto } from 'libs/common/src/entities/user/dtos/update_user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  //WORKS
  getTest(): string {
    return `Hello World from user service!`;
  }

  // Create a new user //WORKS
  async createUser(createUserDto: CreateUserDto) {
    const { email, password, roles, restaurantId } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email, });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const salt = await bcrypt.genSalt(10);

    // Check if the password is strong enough
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }
    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

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

  // Get user by email //WORKS
  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Get user by ID //WORKS
  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update user details //WORKS
  async updateUser(id: string, updateUserDto: updateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update fields
    Object.assign(user, updateUserDto);

    // Save updated user
    await user.save();
    return { message: 'User updated successfully', user };
  }

  // Change user password  //WORKS
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log('User found:', user.passwordHash);

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

  // Delete a user //WORKS
  async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.deleteOne();
    return { message: 'User deleted successfully' };
  }

  // Update user roles //WORKS
  async updateRoles(userId: string, roles: UserRole[]) {
    console.log('Updating roles for user:', userId, 'to roles:', roles);
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
