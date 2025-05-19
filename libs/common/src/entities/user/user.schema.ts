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
    _id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
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
        ret.id = ret._id;        // alias
        delete ret.__v;          // jeśli nie chcesz wersji
        return ret;
    },
});

UserSchema.set('toObject', {
    transform: (doc, ret) => {
        return ret;
    },
});

// Indexes
UserSchema.index({ email: 1, restaurantId: 1 }, { unique: true });
UserSchema.index({ restaurantId: 1 });
UserSchema.index({ _id: 1 });