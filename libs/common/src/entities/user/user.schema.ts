import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
    Admin = 'admin',
    Owner = 'owner',
    Manager = 'manager',
    Employee = 'employee',
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({
        type: [String],
        enum: Object.values(UserRole),
        default: [UserRole.Employee],
    })
    roles: UserRole[];

    @Prop({ required: false })
    name?: string;

    @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: false })
    restaurantId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hide passwordHash on serialization
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.passwordHash;
        return ret;
    },
});
UserSchema.set('toObject', {
    transform: (doc, ret) => {
        delete ret.passwordHash;
        return ret;
    },
});

// Indexes
UserSchema.index({ email: 1, restaurantId: 1 }, { unique: true });
UserSchema.index({ restaurantId: 1 });