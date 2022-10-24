import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductLayout } from "./product.layout";

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from "@angular/material/paginator"
import { BaseTableModuel } from "../../Component/BaseTable/base.table.module"

import { APIModule } from '../../Lib/api'
@NgModule({
    declarations: [ProductLayout],
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
    ],
    exports:[ProductLayout]
})

export class ProductModule{}