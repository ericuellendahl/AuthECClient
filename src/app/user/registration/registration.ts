import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstkeyPipe } from '../../shared/pipes/firstkey-pipe';
import { Auth } from '../../shared/services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstkeyPipe],
  templateUrl: './registration.html',
  styles: ``,
})
export class Registration {
  private formBuilder = inject(FormBuilder);
  private service = inject(Auth);
  private toastr = inject(ToastrService);
  isSubmitted = false;

  passwordMatchValidator(control: any) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPassword.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
    }
  }

  form = this.formBuilder.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        ],
      ],
      confirmPassword: [''],
    },
    { validators: this.passwordMatchValidator }
  );

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
      this.service.creatUser(this.form.value).subscribe({
        next: (response: any) => {
          if (response.message.length > 0 && response.message !== null) {
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success(response.message, 'Success');
            console.log('User created successfully', response);
          } else {
            this.toastr.error('Failed to create user', 'Error');
          }
        },
        error: (error) => {
          console.error('Error creating user', error);
        },
      });
    } else {
      console.error(this.form);
    }
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (Boolean(control?.touched) || this.isSubmitted)
    );
  }
}
