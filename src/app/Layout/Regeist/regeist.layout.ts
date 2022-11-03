import { Component, inject, Injectable, OnInit, SecurityContext } from '@angular/core'
import {FormControl, Validators} from '@angular/forms';
import { PostProcessPopupParams } from 'ag-grid-community';
import { EasyFormSetting } from "../../Component/EasyForm/easyform.component"
import { APIService } from '../../Lib/api.service'
import { PersonalInformationLayout } from '../PersonalInformation/personalInformation.layout'


interface RegeistModel {
    Account: string,
    Password: string,
    ConfirmPassword: string,
    EMail : string,
    NickName : string,
}



@Component({
    selector: "app-regeist",
    templateUrl: "./regeist.layout.html",
    styleUrls :["./regeist.layout.css"]
})

export class RegeistLayout {
    constructor (private _http : APIService){}
    
    protected _pData : RegeistModel = {
        Account: "",
        Password : "",
        ConfirmPassword : "",
        EMail : "",
        NickName : "",
    }

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    submitRegeist(){
        if(this.ValidateRegeistData()){
            this._http.callAPI("member/new", "PUT", this._pData)
            .subscribe((res:any) => {
                window.alert("Regeist Successful, please login again")
                window.location.assign("/login")
            })
        }
    }

    ValidateRegeistData(){
        if(!this._pData.Account){
            window.alert("Account cant not be empty")
            return false;
        }

        if(!this._pData.Password){
            window.alert("Password cant not be empty")
            return false;
        }
        if(!this._pData.ConfirmPassword){
            window.alert("ConfirmPassword cant not be empty")
            return false;
        }
        if(!this._pData.EMail) {
            window.alert("EMail cant not be empty")
            return false;
        }
        if(!this._pData.NickName){
            window.alert("NickName cant not be empty")
            return false;
        }
        if(this._pData.Password != this._pData.ConfirmPassword){
            window.alert("Confirm Password is wrong, please check again")
            this._pData.Password = ""
            this._pData.ConfirmPassword = ""
            return false;
        }
        return true
    }
}