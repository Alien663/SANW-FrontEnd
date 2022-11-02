import { Injectable } from '@angular/core'
import { APIService } from '../../Lib/api.service'
import { ProductModel, Conditions } from './product.model'
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class ProductService{
    public showCondition = true
    public showResult = false
    public showTable = false

    public pageSizeOptions : number[] = [5, 10, 25, 100]
    public pageEvent! : PageEvent
    public columnsToDisplay : string[] = ["productName", "quantityPerUnit", "categoryName", "supplier", "contactName"]
    public resData : Array<ProductModel> = []
    public length : number = 0
    public allColumns : string[] = []
    public SearchCondition : Conditions = {
        Category: 0,
        Supplier: 0,
        Price: 0.0,
        Discontinued: false,
        ProductName: "",
        page: 0,
        pageSize: 10
    }

    constructor(private _http: APIService){}

    submitQuery() {
        console.log(this.SearchCondition)
        this._http.callAPI("Product/gridview", "POST",{
            ...this.SearchCondition,
            Category : parseInt(this.SearchCondition.Category.toString()),
            Supplier : parseInt(this.SearchCondition.Supplier.toString())
        }).subscribe((res: any) => {
            this.resData = res.data
            this.length = res.counts
            this.allColumns = Object.keys(this.resData[0])
        })
        this.showResult = true
        this.showTable = true
        this.showCondition = false
    }

    onPaginateChange(event: any) {
        this.SearchCondition.page = event.pageIndex
        this.SearchCondition.pageSize = event.pageSize
        this.submitQuery()
    }

    downloadFile(){
        this._http.download("Product/download", "Products.xlsx", {
            ...this.SearchCondition,
            Category : parseInt(this.SearchCondition.Category.toString()),
            Supplier : parseInt(this.SearchCondition.Supplier.toString())
        }, 
        { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    }

    updateProduct(payload : ProductModel){
        this._http.callAPI("Product", "POST", payload)
        .subscribe(res => {
            window.alert("Update Product Success")
        })
    }
}


