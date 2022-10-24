import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { EasyFormComponent } from "./easyform.component"

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
    ],
    exports: [EasyFormComponent],
    declarations:[EasyFormComponent],
})

export class EasyFormModule{}