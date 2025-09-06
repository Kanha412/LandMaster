import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminAddRequirementComponent } from './components/admin-add-requirement/admin-add-requirement.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { AdminViewPropertyComponent } from './components/admin-view-property/admin-view-property.component';
import { AdminViewRequirementComponent } from './components/admin-view-requirement/admin-view-requirement.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { UserAddPropertyComponent } from './components/user-add-property/user-add-property.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { UserViewPropertyComponent } from './components/user-view-property/user-view-property.component';
import { UserViewRequirementComponent } from './components/user-view-requirement/user-view-requirement.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminAddRequirementComponent,
    AdminNavbarComponent,
    AdminViewFeedbackComponent,
    AdminViewPropertyComponent,
    AdminViewRequirementComponent,
    ErrorComponent,
    LoginComponent,
    RegistrationComponent,
    UserAddFeedbackComponent,
    UserAddPropertyComponent,
    UserNavbarComponent,
    UserViewFeedbackComponent,
    UserViewPropertyComponent,
    UserViewRequirementComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
