import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  loginUser() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email ?? '';

      const password = this.loginForm.value.password ?? '';

      this.authService.login(email, password).subscribe((response) => {
        console.log(response);

        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard']);
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
