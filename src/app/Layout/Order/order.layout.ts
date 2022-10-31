import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { APIService } from '../../Lib/api.service'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

interface SearchForm{
    nowPage: number,
    pageSize: number
}

interface Conditions extends SearchForm{
    OrderDate: Date | undefined,
    Shipper: number,
}


@Component({
    selector: 'app-order',
    templateUrl: './order.layout.html',
    styleUrls: ['./order.layout.css', './order.table.css'],
})

export class OrderLayout implements OnInit {
    
    constructor(private myapi: APIService, public dialog: MatDialog) { }

    protected SearchConditions : Conditions = {
        pageSize: 10,
        nowPage: 0,
        OrderDate : undefined,
        Shipper : 0
    }

    ngOnInit() {
        this.myapi.callAPI("General/dropdown/shipper", "GET").subscribe((res: any) => {
            this.shippers = res
        })
    }
    
    protected shippers: any = []
    protected showCondition = true;
    protected showResult = true;
    protected showTable = false;
    protected length = 100;
    protected pageSizeOptions: number[] = [5, 10, 25, 100];
    protected pageEvent!: PageEvent;
    protected resData: any
    protected cols: string[] = []
    expandedElement  = false
    protected columnsToDisplay : string[] = ["customerID", "orderDate", "shipName", "shippedDate", "employee"]

    submitForm(){
        this.SearchConditions.nowPage = 0
        this.SearchConditions.pageSize = 10
        this.submitQuery()
    }

    submitQuery() {
        console.log(this.SearchConditions)
        this.myapi.callAPI("Orders/gridview", "POST",{ ... this.SearchConditions})
        .subscribe((res: any) => {
            console.log(res)
            this.resData = res.data
            this.length = res.counts
            this.cols = Object.keys(this.resData[0])
        })
        this.showTable = true
        this.showCondition = false
    }

    onPaginateChange(event: any) {
        this.SearchConditions.nowPage = event.pageIndex
        this.SearchConditions.pageSize = event.pageSize
        this.submitQuery()
    }

    submitDownloadFile(){
        this.myapi.download("Orders/download", { ...this.SearchConditions
        }).subscribe((res:any) => {
            let blob: Blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          let downloadUrl = window.URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "Orders.xlsx";
          link.click();
        })
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(OrderDetailComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
        });
      }
}


@Component({
    selector: 'app-order-detail',
    templateUrl: './orderDetail.component.html',
    styleUrls: ['./order.layout.css'],
})

export class OrderDetailComponent{
    constructor(public dialogRef: MatDialogRef<OrderDetailComponent>) {}
    @Input() dataspurce : any
}