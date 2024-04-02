import { Injectable } from '@angular/core';
import { Country } from '../shared/models/country';
import { sample_countries } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  getAll(): Country[] {
    return sample_countries
  }

  getAllCountriesBySearch(word: string) {
    return this.getAll().filter(country => country.name.toLowerCase().includes(word.toLowerCase()))
  }
}
