import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderLayout } from "./order.layout";

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from "@angular/material/paginator"
import { BaseTableModuel } from "../../Component/BaseTable/base.table.module"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core";

import { APIModule } from '../../Lib/api'

@NgModule({
    declarations: [OrderLayout],
    imports:[
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatExpansionModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        BaseTableModuel,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers:[APIModule],
    exports:[OrderLayout]
})

export class OrderModule{}