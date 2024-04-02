import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = '';
  
  constructor(activated: ActivatedRoute, private router: Router) {
    activated.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm']
      } else {
      }
    })
  }

  search(term: string): void {
    if (term) {
      this.router.navigateByUrl('/search/' + term)
    }
  }

}
