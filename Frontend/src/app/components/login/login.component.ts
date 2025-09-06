import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 
export class LoginComponent implements OnInit {
 
  loginForm!: NgForm;
  loginModel: Login = { Email: '', Password: '' };
  errorMessage: string = ''
 
  constructor(private service: AuthService, private router: Router) { }
 
  ngOnInit(): void {
 
  }
 
  // isFieldInvalid(fieldName: string): boolean {
  //   return !this.loginModel[fieldName];
  // }

  isFieldInvalid(fieldName: keyof Login): boolean {
    return !this.loginModel[fieldName];
  }
  
 
  isFormValid(): boolean {
    if (this.isFieldInvalid('Email') || this.isFieldInvalid('Password')) {
      return false;
    }
    return true;
  }
 
  login() {
    if (this.isFormValid()) {
 
      this.service.login(this.loginModel).subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.errorMessage = error.error;
        }
      )
    }
  }
 
}
 
 



