import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterFormComponent} from './components/registration/register-form/register-form.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {HomePageComponent} from './components/home/home-page/home-page.component';
import {AuthGuardGuard} from './guards/auth-guard.guard';
import {LoginPageComponent} from './components/login/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-up',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: RegisterFormComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: '**',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
