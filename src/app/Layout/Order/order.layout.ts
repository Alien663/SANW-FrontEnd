import { Component, OnInit, Inject } from '@angular/core';
import { APIService } from '../../Lib/api.service'
import { OrderModel } from './order.model'
import { OrderService } from './order.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from '../../Component/alertDialog/alertDialog.component'

@Component({
    selector: 'app-order',
    templateUrl: './order.layout.html',
    styleUrls: ['./order.layout.css', './order.table.css'],
})

export class OrderLayout implements OnInit {
    protected shippers: any = []
    public resDataNow : OrderModel | undefined

    constructor(
        private _http: APIService,
        public dialog: MatDialog,
        protected _service : OrderService,
    ) { }

    ngOnInit() {
        this._http.callAPI("General/dropdown/shipper", "GET").subscribe((res: any) => {
            this.shippers = res
        })
    }

    openDialog(row : OrderModel): void {
        this.dialog.open(OrderDetailComponent, {
            width: '70%',
            data: {...row},
            disableClose: true
        });
    }

    deleteOrder(OrderID : number){
        this.dialog.open(AlertComponent, {
            width: '50%',
            disableClose: true,
            data: "Hello World!",
            role: "alertdialog",
        });
    }
}

@Component({
    selector: 'app-order-detail',
    templateUrl: './orderDetail.component.html',
    styleUrls: ['./order.dialog.css'],
})

export class OrderDetailComponent{
    constructor(
        public dialogRef: MatDialogRef<OrderDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OrderModel,
        private _service : OrderService
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }

    submitForm(){
        this._service.updateOrderDetails(this.data)
        this.dialogRef.close()
        this._service.submitQuery()
    }
}