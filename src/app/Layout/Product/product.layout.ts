import { Component, OnInit, Inject } from "@angular/core";
import { APIService } from '../../Lib/api.service'
import { ProductModel } from './product.model'
import { ProductService } from "./product.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "app-product",
    templateUrl: "./product.layout.html",
    styleUrls: ["./product.layout.css", "./product.table.css"]
})

export class ProductLayout implements OnInit {
    protected categories:  any
    protected suppliers: any
    protected resDataNow : ProductModel | undefined
    constructor(
        private _http: APIService,
        public _service : ProductService,
        private dialog: MatDialog
    ) {}
    
    ngOnInit() {
        this._http.callAPI("General/dropdown/category", "GET")
        .subscribe((res: any) => {this.categories = res})
        this._http.callAPI("General/dropdown/supplier", "GET")
        .subscribe((res: any) => {this.suppliers = res})
    }

    openDialog(row : ProductModel): void {
        this.resDataNow = row
        this.dialog.open(ProductDetailComponent, {
            width: '70%',
            data: this.resDataNow,
            disableClose: true
        });
    }
}


@Component({
    selector: 'app-product-detail',
    templateUrl: './productDetail.component.html',
    styleUrls: ['./product.dialog.css'],
})

export class ProductDetailComponent{
    constructor(
        public dialogRef: MatDialogRef<ProductDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ProductModel,
        private _service : ProductService
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }

    submitForm(){
        this._service.updateProduct(this.data);
        this.dialogRef.close();
        this._service.submitQuery();
    }
}