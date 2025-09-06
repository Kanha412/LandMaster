import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddRequirementComponent } from './components/admin-add-requirement/admin-add-requirement.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AdminViewRequirementComponent } from './components/admin-view-requirement/admin-view-requirement.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { AdminViewPropertyComponent } from './components/admin-view-property/admin-view-property.component';
import { UserAddPropertyComponent } from './components/user-add-property/user-add-property.component';
import { UserViewPropertyComponent } from './components/user-view-property/user-view-property.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { UserViewRequirementComponent } from './components/user-view-requirement/user-view-requirement.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { AdminGuard } from './components/authguard/admin.guard';
import { UserGuard } from './components/authguard/user.guard';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'registration', component: RegistrationComponent },
  {path:'login',component:LoginComponent},
  {path:'user/user-navbar',component:UserNavbarComponent ,canActivate:[AuthGuard,UserGuard]},
  {path:'home',component:HomeComponent},
  {path:'admin/add-requirement',component:AdminAddRequirementComponent, canActivate: [AuthGuard,AdminGuard]},
  {path:'user/add-property/:id',component:UserAddPropertyComponent, canActivate: [AuthGuard,UserGuard]},
  {path:'admin/view-requirement',component:AdminViewRequirementComponent,canActivate:[AuthGuard,AdminGuard]} ,
  {path:'landRequirement/edit/:id',component:AdminAddRequirementComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/feedbacks',component:AdminViewFeedbackComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/properties',component:AdminViewPropertyComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'user/add-property',component:UserAddPropertyComponent,canActivate:[AuthGuard,UserGuard]},
  {path:'user/view-property',component:UserViewPropertyComponent,canActivate:[AuthGuard,UserGuard]},
  {path:'user/add-feedback',component:UserAddFeedbackComponent,canActivate:[AuthGuard,UserGuard]},
  {path:'user/view-feedback',component:UserViewFeedbackComponent,canActivate:[AuthGuard,UserGuard]},
  {path:'user/requirement',component:UserViewRequirementComponent,canActivate:[AuthGuard,UserGuard]}
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
