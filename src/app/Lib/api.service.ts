import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class APIService {
    constructor(private http: HttpClient) {}
    apiurl =  isDevMode() ? "http://localhost:59089/api" : "/api"
    callAPI(path: string, method: "GET" | "POST" | "PUT" | "DELETE", reqdata?: any, header?: { [header: string]: string | string[] }, filelist: any = []) {
        let reqParams = new HttpParams();
        if(method === "GET" && reqdata.length > 0){
            reqdata.forEach( (item : any) => {
                let keyname = Object.keys(item)[0]
                reqParams.set(keyname, item[keyname])
            });
        }
        if(!header){
            header = {'Content-Type': 'application/json'}
        }
        let url = `${this.apiurl}/${path}`
        let option = {
            headers: {
                ...header
            },
            observe: "body" as "body",
            params: method === "GET" ? reqParams : {},
            withCredentials: true,
            responseType: 'json' as 'json'
        }
        if (filelist.length) {
            let formData = new FormData()
            formData.append('file', filelist[0], filelist[0].name);
            for (let k in reqdata)
                formData.append(k, reqdata[k])
            option.headers["Content-Type"] = 'multipart/form-data'
        }
        switch (method) {
            case "GET":
                return(this.http.get(url, option))
                    .pipe(catchError(this.handleError))
                break;
            case "POST":
                return(this.http.post(url, reqdata, option))
                    .pipe(catchError(this.handleError))
                break;
            case "PUT":
                return(this.http.put(url, reqdata, option))
                    .pipe(catchError(this.handleError))
                break;
            case "DELETE":
                return(this.http.delete(url, {
                    body: reqdata,
                    ...option
                })
                ).pipe(catchError(this.handleError))
                break;
        }
    }

    download<T>(paramUrl: string, paramBody: object, paramOption?: object): Observable<T> {
        let option = { responseType: "blob" as "json" };
        return this.http.post<T>(this.apiurl + "/" + paramUrl, paramBody, option).pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse){
        if(error.status === 0){
            window.alert(error.error)
            console.error("Error occured : ", error.error)
        }
        else{
            window.alert(error.error)
            console.error(`Backend return code ${error.status}, body was`, error.error)
        }
        return throwError( () => new Error("Something bad happened; please try again later."))
    }
}