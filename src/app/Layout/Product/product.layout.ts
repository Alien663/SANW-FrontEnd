import { Component, OnInit, Inject } from "@angular/core";
import { APIService } from '../../Lib/api.service'
import { ProductModel } from './product.model'
import { ProductService } from "./product.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from '../../Component/alertDialog/alertDialog.component'


@Component({
    selector: "app-product",
    templateUrl: "./product.layout.html",
    styleUrls: ["./product.layout.css", "./product.table.css"]
})

export class ProductLayout implements OnInit {
    protected resDataNow : ProductModel | undefined
    constructor(
        private _http: APIService,
        public _service : ProductService,
        private dialog: MatDialog
    ) {}
    
    ngOnInit() {
        this._http.callAPI("General/dropdown/category", "GET")
        .subscribe((res: any) => {this._service.categories = res})
        this._http.callAPI("General/dropdown/supplier", "GET")
        .subscribe((res: any) => {this._service.suppliers = res})
    }

    updateProduct(row : ProductModel): void {
        this.resDataNow = row
        this.dialog.open(ProductDetailComponent, {
            width: '70%',
            data: this.resDataNow,
        });
        this._service.submitQuery()
    }

    deleteProduct(ProductID : number){
        const _dia = this.dialog.open(AlertComponent, {
            width: '500px',
            data: "Are you sure about that?",
            role: "alertdialog",
        })
        _dia.afterClosed().subscribe(result => {
            if(result){
                this._service.deleteProduct(ProductID)
                this._service.submitQuery()
            }
        })
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
        protected _service : ProductService
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