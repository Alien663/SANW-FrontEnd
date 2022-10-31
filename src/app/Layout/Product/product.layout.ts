import { Component, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { APIService } from '../../Lib/api.service'

interface SearchForm{
    nowPage: number,
    pageSize: number
}

interface Conditions extends SearchForm{
    Category: Number,
    Supplier: Number,
    Price: Number,
    Discontinued: Boolean,
    ProductName: String,
}

@Component({
    selector: "app-product",
    templateUrl: "./product.layout.html",
    styleUrls: ["./product.layout.css"]
})

export class ProductLayout implements OnInit {
    constructor(private _http: APIService) {}

    SearchCondition : Conditions = {
        Category: 0,
        Supplier: 0,
        Price: 0.0,
        Discontinued: false,
        ProductName: "",
        nowPage: 0,
        pageSize: 10
    }
    pageSizeOptions : number[] = [5, 10, 25, 100]
    pageEvent : PageEvent | undefined
    showCondition : boolean = true
    showResult : boolean = true
    showTable : boolean =  false
    length: number = 0
    resData : any
    cols: string[] = []
    categories:  any
    suppliers: any
    
    ngOnInit() {
        this._http.callAPI("General/dropdown/category", "GET")
        .subscribe((res: any) => {
            this.categories = res
        })
        this._http.callAPI("General/dropdown/supplier", "GET")
        .subscribe((res: any) => {
            this.suppliers = res
        })
    }

    submitForm(){
        this.SearchCondition.pageSize = 10;
        this.SearchCondition.nowPage = 0;
        this.showTable = true
        this.showCondition = false
        this.submitQuery()
    }

    submitQuery() {
        this._http.callAPI("Product/gridview", "POST",{...this.SearchCondition})
            .subscribe((res: any) => {
                this.resData = res.data
                this.length = res.counts
                this.cols = Object.keys(this.resData[0])
        })
    }

    onPaginateChange(event: any) {
        this.SearchCondition.nowPage = event.pageIndex
        this.SearchCondition.pageSize = event.pageSize
        this.submitQuery()
    }

    submitDownloadFile(){
        this._http.download("Product/download", {...this.SearchCondition})
        .subscribe((res:any) => {
            let blob: Blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            let downloadUrl = window.URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "Products.xlsx";
            link.click();
        })
    }
}