import { Component, OnInit } from '@angular/core'
import {FormControl, Validators} from '@angular/forms';
import { EasyFormSetting } from "../../Component/EasyForm/easyform.component"
import { APIService } from '../../Lib/api.service'

@Component({
    selector: "app-regeist",
    templateUrl: "./regeist.layout.html",
    styleUrls :["./regeist.layout.css"]
})

export class RegeistLayout {
    constructor (private myapi : APIService){}
    
    personaldata = {
        account: "",
        password: "",
        confirm_password: "",
        eMail: "",
        nickName: "",
    }

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    
    submitRegeist(){
        console.log(this.personaldata)
        if(this.personaldata.password != this.personaldata.confirm_password){
            window.alert("confirm_password is wrong, please check again")
        }
        this.myapi.callAPI("member/new", "PUT", this.personaldata).subscribe((res:any) => {
            window.alert("Regeist Successful, please login again")
            window.location.assign("/login")
        })
    }
}