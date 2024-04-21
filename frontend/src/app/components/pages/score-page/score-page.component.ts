import { Component } from '@angular/core';
import confetti from 'canvas-confetti';
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
    confetti({
      angle: 270,
      particleCount: 200,
      spread: 200,
      origin: { y: -0.3 },
      ticks: 130
    });
  }

  formatDate(dateInput: string): string {
    const date = new Date(dateInput)
    return date.toDateString() + " - " + date.toLocaleTimeString()
  }



}
