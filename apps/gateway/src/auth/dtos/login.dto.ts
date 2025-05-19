import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail()  // Ensures the email is in the correct format
    email: string;

    @IsString()  // Ensures the password is a string
    @MinLength(6, { message: 'Password must be at least 6 characters long' })  // Ensures the password has at least 6 characters
    password: string;
}