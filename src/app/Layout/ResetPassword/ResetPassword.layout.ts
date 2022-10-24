import { Component } from '@angular/core'
import {FormControl, Validators} from '@angular/forms';
import { APIService } from '../../Lib/api.service'
import { AuthService } from '../../Authorization/Authorization.service'

@Component({
    selector: "app-reset-password",
    templateUrl: "./ResetPassword.layout.html",
    styleUrls :["./ResetPassword.layout.css"]
})

export class ResetPasswordLayout {
    constructor (private myapi : APIService, private auth: AuthService){}
    
    the_password = {
        oldpwd : "",
        newpwd : "",
        newpwd2 : ""
    }

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    
    submitChange(){
        console.log(this.the_password)
        if(this.the_password.newpwd != this.the_password.newpwd2){
            window.alert("Confirm Passwor fail, please check again")
            this.the_password.oldpwd = ""
            this.the_password.newpwd = ""
            this.the_password.newpwd2 = ""
        }
        else{
            this.myapi.callAPI("Member/password/renew", "POST", {
                OldPassword: this.the_password.oldpwd,
                NewPassword: this.the_password.newpwd
            }).subscribe( res => {
                window.alert("change password success, please login again")
                this.auth.logout()
            })
        }
    }
}