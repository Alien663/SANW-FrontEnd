import { CommonModule } from '@angular/common'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Input, isDevMode, NgModule } from '@angular/core';
import { tap, map } from "rxjs/operators";

@NgModule({
    imports:[
        CommonModule
    ]
})

export class APIModule {
    constructor(private http: HttpClient) { }
    resData: any
    callAPI(path: string, method: "GET" | "POST" | "PUT" | "DELETE", reqdata?: any, header?: { [header: string]: string | string[] }, filelist: any = []) {
        const apiurl = isDevMode() ? "http://localhost:59089/api" : "/api";
        let url = `${apiurl}/${path}`
        let option = {
            headers: {
                'Content-Type': 'application/json',
                ...header
            },
            observe: "body" as "body",
            params: method === "GET" ? new HttpParams(reqdata) : new HttpParams(),
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
                break;
            case "POST":
                return(this.http.post(url, reqdata, option))
                break;
            case "PUT":
                return(this.http.put(url, reqdata, option))
                break;
            case "DELETE":
                return(this.http.delete(url, {
                    body: reqdata,
                    ...option
                }))
                break;
        }
        return this.resData
    }
}