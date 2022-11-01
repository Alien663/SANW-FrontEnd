import { Injectable } from '@angular/core'
import { APIService } from '../../Lib/api.service'
import { OrderModel, ConditionModel } from './order.model'
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class OrderService{
    public showCondition = true;
    public showResult = false;
    public showTable = false;
    public length = 0;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public pageEvent!: PageEvent;
    public resData: Array<OrderModel> = []
    public allColumns: string[] = []
    public columnsToDisplay : string[] = ["customerID", "orderDate", "shipName", "shippedDate", "employee"]
    public SearchConditions : ConditionModel = {
        pageSize: 10,
        page: 0,
        OrderDate : undefined,
        Shipper : 0
    }

    constructor(private _http : APIService){}

    submitQuery() {
        this._http.callAPI("Orders/gridview", "POST",{ ...this.SearchConditions
        }).subscribe((res: any) => {
            this.resData = res.data
            this.length = res.counts
            this.allColumns = Object.keys(this.resData[0])
            console.log(this.resData)
        })
        this.showTable = true
        this.showResult = true;
        this.showCondition = false
    }

    downloadFile(){
        this._http.download("Orders/download", { ...this.SearchConditions
        }).subscribe((res:any) => {
            let blob: Blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          let downloadUrl = window.URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "Orders.xlsx";
          link.click();
        })
    }

    onPaginateChange(event: any) {
        this.SearchConditions.page = event.pageIndex
        this.SearchConditions.pageSize = event.pageSize
        this.submitQuery()
    }

}