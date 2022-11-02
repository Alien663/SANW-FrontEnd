import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alertDialog.component"
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [AlertComponent],
    imports:[
        CommonModule,
        MatDialogModule
    ],
})

export class AlertDialogModuel{}