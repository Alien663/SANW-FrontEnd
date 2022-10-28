import { Component, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { APIService } from '../../Lib/api.service'

@Component({
    selector: "app-product",
    templateUrl: "./product.layout.html",
    styleUrls: ["./product.layout.css"]
})

interface SearchForm{
    page: number,
    pageSize: number
}

interface Conditions extends SearchForm{
    Category: Number,
    Supplier: Number,
    Price: Number,
    Discontinued: Boolean,
    ProductName: String,
}

export class ProductLayout implements OnInit {
    constructor(private myapi: APIService) { }
    showCondition = true;
    showResult = true;
    showTable = false;
    length = 100;
    pageSize = 10;
    nowPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageEvent: PageEvent | undefined;
    testData: any
    cols: string[] = []
    categories: any = []
    suppliers: any = []
    SearchCondition : Conditions = {
        Category: 0,
        Supplier: 0,
        Price: 0.0,
        Discontinued: false,
        ProductName: "",
        page: 0,
        pageSize: 10
    }

    ngOnInit() {
        this.myapi.callAPI("General/dropdown/category", "GET").subscribe((res: any) => {
            this.categories = res
        })
        this.myapi.callAPI("General/dropdown/supplier", "GET",).subscribe((res: any) => {
            this.suppliers = res
        })
    }

    submitForm(){
        this.pageSize = 10;
        this.nowPage = 0;
        this.showTable = true
        this.showCondition = false
        this.submitQuery()
    }

    submitQuery() {
        this.myapi.callAPI("Product/gridview", "POST",{...this.SearchCondition})
            .subscribe((res: any) => {
                this.testData = res.data
                this.length = res.counts
                this.cols = Object.keys(this.testData[0])
        })
    }

    onPaginateChange(event: any) {
        this.nowPage = event.pageIndex
        this.SearchCondition.pageSize = event.pageSize
        this.submitQuery()
    }

    submitDownloadFile(){
        this.myapi.download("Product/download", {...this.SearchCondition})
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