import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  private router = inject(Router);

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/signin');
  }
}
