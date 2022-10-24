import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BaseTableComponent } from "./base.table.component"
import { MatTableModule } from '@angular/material/table'

@NgModule({
    imports:[
        CommonModule,
        MatTableModule
    ],
    declarations: [BaseTableComponent],
    exports: [BaseTableComponent]
})

export class BaseTableModuel{}