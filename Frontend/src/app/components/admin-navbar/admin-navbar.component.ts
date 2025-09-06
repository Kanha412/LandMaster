import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userId: number | null = null;
  user: User = {
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
        console.log(this.user);
      });
    }
  }

  // Method to check login status and user role
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  // Method to handle logout
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

