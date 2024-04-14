import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordMatchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, TitleComponent, CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  returnUrl = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private activated: ActivatedRoute, private router: Router) {  }

  ngOnInit(): void { 
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, {
      validators: PasswordMatchValidator('password', 'confirmPassword')
    } as AbstractControlOptions)
    this.returnUrl = this.activated.snapshot.queryParams.returnUrl
  }

  get fc() {
    return this.registerForm.controls
  }

  submit() {
    this.submitted = true
    if (this.registerForm.invalid) return;

    const form = this.registerForm.value
    const user: IUserRegister = {
      name: form.name,
      username: form.username,
      password: form.password,
      confirmPassword: form.comfirmPassword,
      highscore: 0
    }
    this.userService.register(user).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl)
    })
  }
}
