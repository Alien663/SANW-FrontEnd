import { Component, OnInit } from '@angular/core';
import { AuthService } from './Authorization/Authorization.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public authService: AuthService){}

  ngOnInit(){
    this.authService.autoLogin()
  }

  Logout(){
    this.authService.logout()
  }
}
