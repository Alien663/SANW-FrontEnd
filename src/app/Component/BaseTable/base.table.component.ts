import { Component, Input } from "@angular/core";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: "app-base-table",
    templateUrl: "./base.table.component.html",
    styleUrls: ["./base.table.component.css"],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
})

export class BaseTableComponent{
    @Input() dataSource : any;
    @Input() displayedColumns: any;
}