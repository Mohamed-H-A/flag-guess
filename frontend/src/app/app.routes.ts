import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CountryPageComponent } from './components/pages/country-page/country-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search/:searchTerm', component: HomeComponent},
    {path: 'country/:id', component: CountryPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent}
];
