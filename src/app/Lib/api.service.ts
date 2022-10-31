import { isDevMode, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class APIService {
    constructor(private http: HttpClient) {}
    public rootURL : string = isDevMode() ? "http://localhost:5000/api" : "/api"
    public option : any = {
        observe: "body" as "body",
        withCredentials: true,
        responseType: 'json' as 'json'
    }

    callAPI(path: string, method: "GET" | "POST" | "PUT" | "DELETE", reqdata?: any, header?: { [header: string]: string | string[] }) {
        let url = `${this.rootURL}/${path}`
        let _header = header? header : {'Content-Type': 'application/json'}
        let option = {
            ...this.option,
            headers: {
                ..._header,
            },
            params: method === "GET" ? this.GetParams(reqdata) : {},
        }
        switch (method) {
            case "GET":
                return(this.http.get(url, option))
                    .pipe(catchError(this.handleError))
            case "POST":
                return(this.http.post(url, reqdata, option))
                    .pipe(catchError(this.handleError))
            case "PUT":
                return(this.http.put(url, reqdata, option))
                    .pipe(catchError(this.handleError))
            case "DELETE":
                return(this.http.delete(url, {
                    body: reqdata,
                    ...option
                })
                ).pipe(catchError(this.handleError))
        }
    }

    download<T>(paramUrl: string, paramBody: object, paramOption?: object): Observable<T> {
        let option = { responseType: "blob" as "json" };
        return this.http.post<T>(this.rootURL + "/" + paramUrl, paramBody, option).pipe(catchError(this.handleError));
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

    GetParams(originData : any){
        let params = new HttpParams();
        if(originData > 0){
            originData.forEach( (item : any) => {
                let keyname = Object.keys(item)[0]
                params.set(keyname, item[keyname])
            })
        }
        return params
    }
}