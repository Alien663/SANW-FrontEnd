import { Component } from '@angular/core'
import {FormControl, Validators} from '@angular/forms';
import { APIService } from '../../Lib/api.service'
import { AuthService } from '../../Authorization/Authorization.service'

interface Password{
    OldPassword : string,
    NewPassword : string,
    ConfirmNewPassword : string,
}

@Component({
    selector: "app-reset-password",
    templateUrl: "./ResetPassword.layout.html",
    styleUrls :["./ResetPassword.layout.css"]
})

export class ResetPasswordLayout {
    constructor (private myapi : APIService, private auth: AuthService){}
    

    protected the_password : Password= {
        OldPassword : "",
        NewPassword : "",
        ConfirmNewPassword : ""
    }

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    
    submitChange(){
        if(this.ValidateData()){
            this.myapi.callAPI("Member/password/renew", "POST", {
                OldPassword: this.the_password.OldPassword,
                NewPassword: this.the_password.NewPassword
            }).subscribe( res => {
                window.alert("change password success, please login again")
                this.auth.logout()
            })
        }
    }

    ValidateData(){
        if(this.the_password.OldPassword = ""){
            window.alert("Old Password cant not be empty")
            return false;
        }
        if(this.the_password.NewPassword = ""){
            window.alert("New Password cant not be empty")
            return false;

        }
        if(this.the_password.ConfirmNewPassword = ""){
            window.alert("Confirm new Password cant not be empty")
            return false;

        }

        if(this.the_password.NewPassword != this.the_password.ConfirmNewPassword){
            window.alert("Confirm New Password Fail, please check again")
            this.the_password.NewPassword = ""
            this.the_password.ConfirmNewPassword = ""
            return false;
        }
        return true;
    }
}