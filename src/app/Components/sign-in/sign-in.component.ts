import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { RegisterRequest, UserRole } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  registrationForm!: FormGroup;
  userTypes: UserRole[] = Object.values(UserRole); // UserTypes = ['User', 'Admin']
  isLoading = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegistrationService, private router: Router) {

    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\u0621-\u064AA-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/)]],
      phoneNumber: ['', Validators.pattern(/^(?:\+20)?1[0125]\d{8}$/)],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&^#()_+=\-{}[\]<>.,:;'"|\\/~`]+$/)]],
      confirmPassword: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  register(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const registerData: RegisterRequest = {
      // Uncomment these when needed
      // fullName: this.registrationForm.value.fullName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      // phoneNumber: this.registrationForm.value.phoneNumber,
      // userType: this.registrationForm.value.userType,
    };

    this.registerService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response.message || 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }
}
