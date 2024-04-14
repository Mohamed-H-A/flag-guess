import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SCOREBOARD_NEWSCORE_URL, SCOREBOARD_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IScoreboard } from '../shared/interfaces/IScoreboard';
import { Scoreboard } from '../shared/models/Scoreboard';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {
  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  updateScoreboard(newScore: IScoreboard) {
    return this.http.post<Scoreboard>(SCOREBOARD_NEWSCORE_URL, newScore).pipe(
      tap({
        next: (score) => {
          this.toastrService.success(
            `Congratulations on a score of ${score.highscore} points! Play again if you think you can beat it!`,
            `New Score`
          )
        },
        error: (errorRes) => {
          this.toastrService.error(errorRes.error.message, `Something went wrong and it couldn't have`)
        }
      })
    )
  }

  getAll() {
    return this.http.get<Scoreboard[]>(SCOREBOARD_URL)
  }


}
