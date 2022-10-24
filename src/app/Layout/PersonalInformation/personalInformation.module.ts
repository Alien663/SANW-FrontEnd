import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PersonalInformationLayout } from './personalInformation.layout'
import { MatDividerModule } from "@angular/material/divider"
import { MatListModule } from "@angular/material/list"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EasyFormModule } from "../../Component/EasyForm/easyform.module"
@NgModule({
    declarations:[
        PersonalInformationLayout
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
        EasyFormModule,
    ],
    exports:[
        PersonalInformationLayout
    ]
})

export class PersonalInformationModule{}