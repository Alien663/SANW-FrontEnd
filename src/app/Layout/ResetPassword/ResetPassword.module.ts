import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ResetPasswordLayout } from './ResetPassword.layout'
import { MatDividerModule } from "@angular/material/divider"
import { MatListModule } from "@angular/material/list"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations:[
        ResetPasswordLayout
    ],
    imports:[
        CommonModule,
        MatDividerModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports:[
        ResetPasswordLayout
    ]
})

export class ResetPasswordModule{}