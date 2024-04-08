import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/partials/header/header.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/partials/loading/loading.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, HomeComponent, HttpClientModule, LoadingComponent]
})
export class AppComponent {
  title = 'frontend';
}
