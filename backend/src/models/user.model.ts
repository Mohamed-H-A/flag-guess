import { Schema, model } from "mongoose";

export interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    highscore: number;
    isAdmin: boolean;
}

export const UserSchema = new Schema<User>(
    {
        name: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        highscore: {type: Number, required: true},
        isAdmin: {type: Boolean, required: true},
    }, 
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
)

export const UserModel = model<User>('user', UserSchema)