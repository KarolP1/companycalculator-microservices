import { IsEmail, IsString, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class updateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    passwordHash: string;

    @IsArray()
    @IsOptional()
    roles?: string[];

    @IsMongoId()
    restaurantId: string;

    @IsString()
    @IsOptional()
    name?: string;
}
