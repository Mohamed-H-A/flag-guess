import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CountryPageComponent } from './components/pages/country-page/country-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { MapPageComponent } from './components/pages/map-page/map-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { GuessingPageComponent } from './components/pages/guessing-page/guessing-page.component';
import { ScorePageComponent } from './components/pages/score-page/score-page.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search/:searchTerm', component: HomeComponent},
    {path: 'country/:id', component: CountryPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'map', component: MapPageComponent},
    {path: 'map/:loc', component: MapPageComponent},
    {path: 'profile', component: ProfilePageComponent, canActivate:[authGuard]},
    {path: 'guess', component: GuessingPageComponent, canActivate:[authGuard]},
    {path: 'scoreboard', component: ScorePageComponent}
];
