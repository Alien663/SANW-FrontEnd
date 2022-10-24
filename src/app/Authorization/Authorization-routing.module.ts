import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';
import { loginUserLayout } from './Login/loginUser.layout';

const authRoutes: Routes = [
  { path: 'login', component: loginUserLayout }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
