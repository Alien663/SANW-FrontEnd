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
    public columns2 : string[] = [...this.columnsToDisplay, "DeleteAction"]
    public SearchConditions : ConditionModel = {
        pageSize: 10,
        page: 0,
        OrderDate : undefined,
        Shipper : 0
    }

    constructor(private _http : APIService){}

    submitQuery() {
        this._http.callAPI("Orders/gridview", "POST",{
            ...this.SearchConditions,
            Shipper: parseInt(this.SearchConditions.Shipper.toString())
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
        this._http.download("Orders/download", "Orders.xlsx", {
            ...this.SearchConditions,
            Shipper: parseInt(this.SearchConditions.Shipper.toString())
        }, 
        { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    }

    onPaginateChange(event: any) {
        this.SearchConditions.page = event.pageIndex
        this.SearchConditions.pageSize = event.pageSize
        this.submitQuery()
    }

    updateOrderDetails(payload : OrderModel){
        this._http.callAPI("Orders", "POST", payload)
        .subscribe(res => {
            window.alert("Update Order Success")
        })
    }

    
}