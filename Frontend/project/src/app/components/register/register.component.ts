import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';
  success = ''; 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{7,12}$/)
      ]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.error = ''; 
    this.success = '';

    this.authService.register(
      this.registerForm.get('username')?.value,
      this.registerForm.get('password')?.value,
      'USER'
    ).subscribe({
      next: (response) => {
        this.success = response.message; 
        this.registerForm.reset();
      },
      error: err => {
        this.error = err.error?.message || 'Registration failed'; 
      }
    });
  }
}