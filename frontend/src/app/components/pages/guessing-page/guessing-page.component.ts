import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Country } from '../../../shared/models/country';
import { CountryService } from '../../../services/country.service';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import fuzzysort from 'fuzzysort';
import { Router, RouterModule } from '@angular/router';
import { ScoreboardService } from '../../../services/scoreboard.service';
import { IScoreboard } from '../../../shared/interfaces/IScoreboard';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-guessing-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, TextInputComponent, RouterModule],
  templateUrl: './guessing-page.component.html',
  styleUrl: './guessing-page.component.css'
})

export class GuessingPageComponent implements OnInit{

  country!: Country
  hints!: any[]
  totalLives = 4
  isCorrect = false
  outputMessage = ''
  threshold = -2
  lives = this.totalLives
  score = 0
  correctAudio: HTMLAudioElement;
  incorrectAudio: HTMLAudioElement;

  constructor(private countryService: CountryService, private userService: UserService, private scoreboardService: ScoreboardService, private router: Router) { 
    this.correctAudio = new Audio();
    this.correctAudio.src = 'assets/correct.mp3';
    this.incorrectAudio = new Audio();
    this.incorrectAudio.src = 'assets/incorrect.mp3';
    this.correctAudio.volume = 0.5
   }
  
  ngOnInit(): void {
    this.getRandomCountry()
  }

  private getRandomCountry() {
    this.countryService.getRandomCountry().subscribe((random_country) => {
      this.country = random_country;
      this.hints = ['No hints yet...', random_country.capital, random_country.continents, random_country.currency]
    });
  }

  failRedirectCheck() {
    this.lives -= 1
    if (this.lives === 0) {
      const newScore: IScoreboard = {
        username: this.userService.currentUser.username,
        highscore: this.score
      }
      this.scoreboardService.updateScoreboard(newScore).subscribe()
    }
  }

  flash() {
    if(this.isCorrect) {
        this.correctAudio.play()
        document.body.style.backgroundColor = '#3aa45ca0';
        setTimeout(() => {
          document.body.style.backgroundColor = '#3aa45c00';
        }, 200)
      } else {
        this.incorrectAudio.play()
        document.body.style.backgroundColor = '#ff000090';
        setTimeout(() => {
          document.body.style.backgroundColor = '#ff000000';
        }, 200)
    }
  }

  reset() {
    if (this.lives > 0) {
      this.score += this.lives
      this.lives = this.totalLives
      this.outputMessage = ''
      setTimeout(() => {
        this.isCorrect = false
        this.getRandomCountry()
      }, 200)
    } else {
      this.router.navigateByUrl('/scoreboard')
    }
  }

  canProceed() {
    return (this.isCorrect || (this.lives === 0))
  }

  normalise(countryName: string): string {
    const conversionMap: { [char: string]: string } = {
      'ã': 'a',
      'é': 'e',
      'í': 'i',
    };
    const normalised = Array.from(countryName.normalize('NFD'))
      .map(char => conversionMap[char] || char)
      .join('')
      .replace(/[\u0300-\u036f]/g, '');
    return normalised;
  }
  
  check(guess: string): void {
    if (guess && guess.length > 3) {
      const res = fuzzysort.single(this.normalise(guess), this.normalise(this.country.name))
      if (res) {  // guess may/may not be close
        if (res.score > this.threshold) {
          this.isCorrect = true
          this.reset()
        } else {
          this.failRedirectCheck()
          this.outputMessage = 'Guess "' + guess +'" was close!.\n Please avoid any abbreviations or contractions'
        }
      } else {
        this.failRedirectCheck()
        if (this.lives === 0) {
          this.outputMessage = 'Country was actually ' + this.country.name
        } else {
          this.outputMessage = 'Incorrect: Country is not "' + guess + '".\n Please check any possible spelling mistakes'
        }
      }
    }
    this.flash()
  }
}
