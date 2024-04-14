import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component';
import { ScoreboardService } from '../../../services/scoreboard.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  user!: User
  highscore = 0
  constructor(private userService: UserService, private scoreboardService: ScoreboardService) {
    this.user = userService.currentUser
    scoreboardService.getAll().subscribe(scoreboard => {
      for (let score of scoreboard) {
        if (score.username === this.user.username) {
          this.highscore = score.highscore
          break
        }
      }
    })
  }

}
