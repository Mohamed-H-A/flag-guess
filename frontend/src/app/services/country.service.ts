import { Injectable } from '@angular/core';
import { Country } from '../shared/models/country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COUNTRIES_BY_ID, COUNTRIES_BY_SEARCH, COUNTRIES_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(COUNTRIES_URL);
  }

  getAllCountriesBySearch(searchTerm: string): Observable<Country[]> {
    return this.http.get<Country[]>(COUNTRIES_BY_SEARCH + searchTerm)
  }

  getCountryById(id: string): Observable<Country> {
    return this.http.get<Country>(COUNTRIES_BY_ID + id)
  }
}
