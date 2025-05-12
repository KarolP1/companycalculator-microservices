import { Types } from 'mongoose';

export class UserResponseDto {
    _id: Types.ObjectId;
    email: string;
    name?: string;
    roles: string[];
    restaurantId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export class UserResponseWithTokenDto extends UserResponseDto {
    token: string;
}

export class UserResponseWithTokenAndRefreshTokenDto extends UserResponseWithTokenDto {
    refreshToken: string;
}

export class UserResponseWithTokenAndRefreshTokenAndRestaurantDto extends UserResponseWithTokenAndRefreshTokenDto {
    restaurant: {
        _id: Types.ObjectId;
        name: string;
        address: string;
        phone: string;
        email: string;
        website: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
