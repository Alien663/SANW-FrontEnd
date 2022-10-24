import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AuthorizationModule } from "./Authorization/Authorization.module"
import { OrderModule } from './Layout/Order/order.module'
import { PersonalInformationModule } from './Layout/PersonalInformation/personalInformation.module'
import { ProductModule } from './Layout/Product/product.module'
import { RegeistModule } from './Layout/Regeist/regeist.module'
import { ResetPasswordModule } from './Layout/ResetPassword/ResetPassword.module'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthorizationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OrderModule,
    PersonalInformationModule,
    ProductModule,
    RegeistModule,
    ResetPasswordModule,
    
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
