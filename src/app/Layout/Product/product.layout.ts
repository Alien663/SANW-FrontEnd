import { Component, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { APIModule } from '../../Lib/api'

@Component({
    selector: "app-product",
    templateUrl: "./product.layout.html",
    styleUrls: ["./product.layout.css"]
})

export class ProductLayout implements OnInit {
    constructor(private myapi: APIModule) { }
    showCondition = true;
    showResult = true;
    showTable = false;
    length = 100;
    pageSize = 10;
    nowPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageEvent!: PageEvent;
    testData: any
    cols: string[] = []
    categories: any = []
    suppliers: any = []
    conditions = {
        Category: "0",
        Supplier: "0",
        Price: "0",
        Discontinued: false,
        ProductName: "",
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
        console.log({
            Category: parseInt(this.conditions.Category),
            Supplier: parseInt(this.conditions.Supplier),
            Price: parseFloat(this.conditions.Price),
            ProductName: this.conditions.ProductName,
            Discontinued: Boolean(this.conditions.Discontinued),
            page: this.nowPage,
            pagesize: this.pageSize
        })
        this.myapi.callAPI("Product/gridview", "POST",
            {
                Category: parseInt(this.conditions.Category),
                Supplier: parseInt(this.conditions.Supplier),
                Price: parseFloat(this.conditions.Price),
                ProductName: this.conditions.ProductName,
                Discontinued: Boolean(this.conditions.Discontinued),
                page: this.nowPage,
                pagesize: this.pageSize
            })
            .subscribe((res: any) => {
                this.testData = res.data
                this.length = res.counts
                this.cols = Object.keys(this.testData[0])
        })
    }

    onPaginateChange(event: any) {
        this.nowPage = event.pageIndex
        this.pageSize = event.pageSize
        this.submitQuery()
    }
}