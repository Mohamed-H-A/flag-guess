import { Component } from '@angular/core';
import { Country } from '../../../shared/models/country';
import { CountryService } from '../../../services/country.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../../partials/search/search.component";
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, CommonModule, SearchComponent, NotFoundComponent]
})
export class HomeComponent {
  countries: Country[] = [];

  constructor(private countryService: CountryService, activated: ActivatedRoute) {
    let countryObservable: Observable<Country[]>;

    activated.params.subscribe((params) => {
      if (params['searchTerm']) {
        countryObservable = this.countryService.getAllCountriesBySearch(params['searchTerm']);
      } else {
        countryObservable = countryService.getAll();
      }
      countryObservable.subscribe((serverCountries) => {
        this.countries = serverCountries;
      })
    })
  }

}
