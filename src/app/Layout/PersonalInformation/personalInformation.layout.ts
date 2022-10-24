import { Component, OnInit } from '@angular/core'
import {FormControl, Validators} from '@angular/forms';
import { EasyFormSetting } from "../../Component/EasyForm/easyform.component"
import { APIService } from '../../Lib/api.service'

@Component({
    selector: "app-personal-info",
    templateUrl: "./personalInformation.layout.html",
    styleUrls :["./personalInformation.layout.css"]
})

export class PersonalInformationLayout implements OnInit {
    constructor (private myapi : APIService){}
    ngOnInit(){
        this.myapi.callAPI("Member/me", "GET", {}).subscribe((res:any) => {
            this.personaldata = res
        })
    }
    
    personaldata = {
        account: "",
        uuid: "",
        eMail: "",
        nickName: "",
        since: "",
        modifyDatetime: ""
    }

    saveData(){
        console.log(this.personaldata)
        this.myapi.callAPI("Member/me", "POST", this.personaldata).subscribe(res => {
            console.log(res)
        })
    }
}