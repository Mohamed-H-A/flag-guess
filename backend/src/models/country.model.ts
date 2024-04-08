import { Schema, model } from "mongoose";

export interface Country {
    id: string;
    name: string;
    population: number;
    currency: string;
    flagUrl: string;
    capital: string;
    tags: string[];
}

export const CountrySchema = new Schema<Country>(
    {
        name: {type: String, required: true},
        population: {type: Number, required: true},
        currency: {type: String, required: true},
        flagUrl: {type: String, required: true},
        capital: {type: String, required: true},
        tags: {type: [String]}
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

export const CountryModel = model<Country>('country', CountrySchema)