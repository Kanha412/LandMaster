import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 
  registerForm: NgForm = new NgForm([], []);
 
  constructor(private service: AuthService, private router: Router) { }
 
  ngOnInit(): void {
  }
 
  userModel: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  }
  errorMessage: string = '';

  confirmPassword: string='';
  formSubmitted: boolean = false;
 
  // isFieldInvalid(fieldName: string): boolean {
  //   return !this.userModel[fieldName];
  // }

  
isFieldInvalid(fieldName: keyof User): boolean {
    return !this.userModel[fieldName];
  }
  
 
  passwordMismatch(): boolean {
    return (this.userModel['Password'] != this.confirmPassword);
  }
 
  isFormValid(): boolean {
    return !(this.isFieldInvalid('Username') || this.isFieldInvalid('Password') || this.isFieldInvalid('UserRole') || this.passwordMismatch() || this.isFieldInvalid('Email') || this.isFieldInvalid('MobileNumber'));
  }
 
  register() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      console.log("In form");
      this.service.register(this.userModel).subscribe(
        data => {
          console.log("in register");
          this.router.navigate(['login']);
        },
        error => {
          this.errorMessage = error.error;
          console.log(error);
        }
      )
    }
  }
 
}
 
 
 
 