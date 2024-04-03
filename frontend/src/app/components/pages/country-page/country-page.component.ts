import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../shared/models/country';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {
  country!: Country;

  constructor(activated: ActivatedRoute, countryService: CountryService) {
    activated.params.subscribe((params) => {
      if (params['id']) {
        countryService.getCountryById(params['id']).subscribe(serverCountry => {
          this.country = serverCountry;
        });
      }
    })
  }

}