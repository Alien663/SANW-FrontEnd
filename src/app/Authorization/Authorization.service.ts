import { Injectable, isDevMode } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { APIService } from '../Lib/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private theAPI : APIService){}
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string | null = null;

    login(data: any){
        const apiurl = isDevMode() ? "http://localhost:59089/api/Member/login" : "/api/Member/login";
        let option = {
            headers: {'Content-Type': 'application/json'},
            observe: "response" as "response",
            withCredentials: true,
            responseType: 'json' as 'json'
        }
        this.http.post(apiurl, data, option)
        .subscribe(res => {
            this.isLoggedIn = true
            window.alert("login success")
        })
    }

    autoLogin(){
        const apiurl = isDevMode() ? "http://localhost:59089/api/Member/login" : "/api/Member/login";
        let option = {
            headers: {'Content-Type': 'application/json'},
            observe: "response" as "response",
            withCredentials: true,
            responseType: 'json' as 'json'
        }
        this.http.get(apiurl).pipe(catchError(this.handleError))
        .subscribe(res => {
            this.isLoggedIn = true
        })
    }

    logout(): void {
        console.log("let me log outtttttt")
        this.theAPI.callAPI("Member/logout", "POST")
        .subscribe( res => {
           this.isLoggedIn = false
           window.location.assign("/login");
        })
    }

    handleError(error: HttpErrorResponse){
        if(error.status === 0){
            console.error("Error occured : ", error.error)
        }
        else{
            console.error(`Backend return code ${error.status}, body was`, error.error)
        }
        return throwError( () => new Error("Something bad happened; please try again later."))
    }
}