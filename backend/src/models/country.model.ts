import axios from "axios";
import { Schema, model } from "mongoose";

export interface Country {
    id: string;
    name: string;
    population: number;
    currency: string;
    flagUrl: string;
    capital: string;
    continents: string[];
    loc: number[]
}

export async function getCountriesFromAPI(): Promise<Country[]> {
    const response = await axios.get("https://restcountries.com/v3.1/independent?status=true&fields=name,currencies,population,continents,capital,flags,latlng")
    const res: any[] = response.data
    return res.map((country, index) => {
        const currencyCode: string = Object.keys(country.currencies)[0];
        const currency: string = country.currencies[currencyCode].name.split(/\s+/).pop(); // United States Dollar -> Dollar
        const capital: string = country.capital[0];
        const continents = country.continents;
        const loc = country.latlng
    
        return {
          id: (index + 1).toString(),
          name: country.name.common,
          population: country.population,
          currency: currency[0].toUpperCase() + currency.slice(1),  // Titlecase
          flagUrl: country.flags.svg,
          capital: capital,
          continents: continents,
          loc: loc
        };
      });
}

export const CountrySchema = new Schema<Country>(
    {
        name: {type: String, required: true},
        population: {type: Number, required: true},
        currency: {type: String, required: true},
        flagUrl: {type: String, required: true},
        capital: {type: String, required: true},
        continents: {type: [String], required: true},
        loc: {type: [Number], required: true}
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