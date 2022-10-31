import { Component, OnInit } from '@angular/core'
import { APIService } from '../../Lib/api.service'

interface PersonalModel {
    Account : string,
    UUID : string,
    EMail : string,
    NickName : string,
    Since : Date,
    ModifyDateTime : Date
}

@Component({
    selector: "app-personal-info",
    templateUrl: "./personalInformation.layout.html",
    styleUrls :["./personalInformation.layout.css"]
})

export class PersonalInformationLayout implements OnInit {
    constructor (private myapi : APIService){}
    ngOnInit(){
        this.myapi.callAPI("Member/me", "GET")
        .subscribe((res:any) => {
            this._pdata = res
        })
    }
    protected _pdata : PersonalModel = {
        Account: "",
        UUID : "",
        EMail: "",
        NickName: "",
        Since : new Date(),
        ModifyDateTime: new Date()
    }
    
    saveData(){
        console.log(this._pdata)
        this.myapi.callAPI("Member/me", "POST", this._pdata)
        .subscribe(res => {
            window.alert("Update Personal Data Success")
            window.location.reload()
        })
    }
}