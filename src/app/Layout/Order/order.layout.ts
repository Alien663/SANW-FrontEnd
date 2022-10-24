import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { APIModule } from '../../Lib/api'

@Component({
    selector: 'app-order',
    templateUrl: './order.layout.html',
    styleUrls: ['./order.layout.css']
})

export class OrderLayout implements OnInit {
    constructor(private myapi: APIModule) { }

    ngOnInit() {
        this.myapi.callAPI("General/dropdown/shipper", "GET").subscribe((res: any) => {
            this.shippers = res
            console.log(this.shippers)
        })
    }

    shippers: any = []
    conditions = {
        OrderDate: "",
        Shipper: "0"
    }
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

    submitForm(){
        this.nowPage = 0
        this.pageSize = 10
        this.submitQuery()
    }

    submitQuery() {
        console.log({
            OrderDate: this.conditions.OrderDate,
            Shipper: parseInt(this.conditions.Shipper),
            page: this.nowPage,
            pagesize: this.pageSize
        })
        this.myapi.callAPI("Orders/gridview", "POST",
            {
                OrderDate: this.conditions.OrderDate,
                Shipper: parseInt(this.conditions.Shipper),
                page: this.nowPage,
                pagesize: this.pageSize
            }).subscribe((res: any) => {
                this.testData = res.data
                this.length = res.counts
                this.cols = Object.keys(this.testData[0])
            })
        this.showTable = true
        this.showCondition = false
    }

    onPaginateChange(event: any) {
        this.nowPage = event.pageIndex
        this.pageSize = event.pageSize
        this.submitQuery()
    }
}
