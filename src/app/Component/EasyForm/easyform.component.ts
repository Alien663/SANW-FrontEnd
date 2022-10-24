import { Input, Component } from "@angular/core";

export interface EasyFormSetting{
    name: string;
    type: string;
    value: string | number;
    disable: boolean;
}

@Component({
    selector: "app-easyform",
    templateUrl: "./easyform.component.html",
    styleUrls: ["./easyform.component.css"]
})

export class EasyFormComponent{
    @Input() formsdata? : EasyFormSetting[]
    @Input() btnNames? : string[]
}