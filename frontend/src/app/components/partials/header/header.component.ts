import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user!: User;
  constructor(private userService:UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  logout() {
    this.userService.logout()
  }

  get auth() {
    return this.user.token
  }
}
