import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()

export class ConfigService{
    constructor(private http : HttpClient){}

    getConfig(){
        return this.http.get("assets/config.json")
    }
}