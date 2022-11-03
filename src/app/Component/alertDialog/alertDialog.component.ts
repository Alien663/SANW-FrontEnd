import { Token } from '@angular/compiler';
import { Component, Inject, Input } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-alertDialog',
    template: `<div style="text-align: center;">
                    <p>{{ data }}</p>
                    <div>
                        <button type="button" mat-button (click)="cancel()">Cancel</button>
                        <button type="button" mat-button (click)="clickOK()">Sure</button>
                    </div>
                </div>`,
    styleUrls: ['./alertDialog.component.css'],
})
export class AlertComponent{
    public Message : string = "This is Default Message";
    constructor(
        public dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialog: MatDialog 
    ){}

    cancel(){
        this.dialogRef.close(false);
    }
    clickOK(){
        this.dialogRef.close(true);
    }
}