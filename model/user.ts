import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: string;
    bio?: string;
    avatarUrl: string;
    images: string[];
    site: { id: string; name: string; role: string, environment: string }[];
    tokens: string;
    isActive: boolean;
    stripeCustomerId: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user', 'manager', 'refiner'],
        },
        bio: {
            type: String,
        },
        avatarUrl: {
            type: String,
        },
        tokens: {
            type: String
        },
        site: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                role: { type: String, required: true },
                environment: { type: String, enum: ['dev', 'prod'], default: 'prod' }
            },
            {
                _id: false
            }
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        stripeCustomerId: {
            type: String
        },
        token: {
            type: String
        },
        images: [String]
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
)

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
