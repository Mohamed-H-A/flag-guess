import { Schema, model } from "mongoose";

export interface Scoreboard {
    id: string;
    username: string;
    highscore: number;
}

export const ScoreboardSchema = new Schema<Scoreboard>(
    {
        username: {type: String, required: true},
        highscore: {type: Number, required: true},
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

export const ScoreboardModel = model<Scoreboard>('scoreboard', ScoreboardSchema)