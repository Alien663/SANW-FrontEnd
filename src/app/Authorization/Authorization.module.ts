import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { loginUserLayout } from "./Login/loginUser.layout"
import { AuthRoutingModule } from "./Authorization-routing.module"

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { APIService} from '../Lib/api.service'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    loginUserLayout
  ],
  providers: [APIService]
})
export class AuthorizationModule {}
