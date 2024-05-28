import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  {
    path:'',
    component:SignInComponent
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'setup-password',
    component:SetupPasswordComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
