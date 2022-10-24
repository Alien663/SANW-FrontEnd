import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from "../Authorization.service"

@Component({
  selector: 'app-loginUser',
  templateUrl: './loginUser.layout.html',
  styleUrls: ['./loginUser.layout.css']
})
export class loginUserLayout{
  constructor(public authService: AuthService) { }

  ngOnInit(){
    if(this.authService.isLoggedIn){
      window.location.assign("/");
    }
  }

  submitLogin(f: NgForm) {
    this.authService.login(f.value)
  }
}