import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../shared/services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private service = inject(Auth);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  isSubmitted = false;

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
      this.service.signin(this.form.value).subscribe({
        next: (response: any) => {
          if (response.message.toLowerCase().includes('sucesso')) {
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success(response.message, 'Success');
            localStorage.setItem('token', response.token.accessToken);
            this.router.navigateByUrl('/dashboard');
          } else {
            this.toastr.error('Login failed', 'Error');
          }
        },
        error: (error: any) => {
          console.error('Login failed', error);
          this.toastr.error('Login failed', 'Login failed');
        },
      });
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
