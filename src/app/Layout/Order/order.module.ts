import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderLayout, OrderDetailComponent } from "./order.layout";
import { OrderService } from './order.service'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogModuel } from '../../Component/alertDialog/alertDialog.module'

@NgModule({
    declarations: [OrderLayout, OrderDetailComponent],
    imports:[
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        AlertDialogModuel,
    ],
    providers: [OrderService]
})

export class OrderModule{}