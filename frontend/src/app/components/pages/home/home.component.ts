import { Component } from '@angular/core';
import { Country } from '../../../shared/models/country';
import { CountryService } from '../../../services/country.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../../partials/search/search.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, CommonModule, SearchComponent]
})
export class HomeComponent {
  countries: Country[] = [];

  constructor(private countryService: CountryService, activated: ActivatedRoute) {
    activated.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.countries = this.countryService.getAllCountriesBySearch(params['searchTerm']);
      } else {
        this.countries = countryService.getAll();
      }
    })
  }

}
