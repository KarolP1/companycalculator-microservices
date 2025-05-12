import { IsEmail, IsString, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    passwordHash: string;

    @IsArray()
    @IsOptional()
    roles?: string[];

    @IsMongoId()
    @IsOptional()
    restaurantId: string;

    @IsString()
    @IsOptional()
    name?: string;
}

