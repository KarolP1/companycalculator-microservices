import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ type: [String], default: ['employee'] })
    roles: string[]; // Możliwe: 'owner', 'manager', 'employee'

    @Prop({ required: false })
    name?: string; // Imię/nazwisko użytkownika

    @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: false })
    restaurantId: Types.ObjectId;
}


export const UserSchema = SchemaFactory.createForClass(User);
// Ukryj hasło przy serializacji
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

// Indeksy
UserSchema.index({ email: 1, restaurantId: 1 }, { unique: true });
UserSchema.index({ restaurantId: 1 });
