import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { ScoreboardService } from '../../../services/scoreboard.service';
import { Scoreboard } from '../../../shared/models/Scoreboard';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css'
})
export class ScorePageComponent {

  scoreboard!: Scoreboard[]
  constructor(private scoreboardService: ScoreboardService) {
    scoreboardService.getAll().subscribe((scores) => {
      this.scoreboard = scores
    })
  }

  formatDate(dateInput: string): string {
    const date = new Date(dateInput)
    return date.toDateString() + " - " + date.toLocaleTimeString()
  }



}
