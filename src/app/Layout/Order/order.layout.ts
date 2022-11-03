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
    public resDataNow : OrderModel | undefined

    constructor(
        private _http: APIService,
        public dialog: MatDialog,
        protected _service : OrderService,
    ) { }

    ngOnInit() {
        this._http.callAPI("General/dropdown/shipper", "GET").subscribe((res: any) => {
            this._service.shippers = res
        })
    }

    updateOrder(row : OrderModel): void {
        this.dialog.open(OrderDetailComponent, {
            width: '70%',
            data: {...row},
        });
        this._service.submitQuery()
    }

    deleteOrder(OrderID : number){
        console.log(OrderID)
        const _dia = this.dialog.open(AlertComponent, {
            width: '500px',
            data: "Are you sure about that?",
            role: "alertdialog",
        })
        _dia.afterClosed().subscribe(result => {
            if(result){
                this._service.deleteOrder(OrderID)
                this._service.submitQuery()
            }
        })
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
        protected _service : OrderService
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }

    submitForm(){
        this._service.updateOrder(this.data)
        this.dialogRef.close()
        this._service.submitQuery()
    }
}