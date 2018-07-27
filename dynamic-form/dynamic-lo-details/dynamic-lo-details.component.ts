import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ILODetail } from '../../models';
@Component({
    selector: 'dynamic-lo-details',
    templateUrl: './dynamic-lo-detais.component.html'
})
export class DynamicLoDetailsComponent implements OnChanges {
    @Input() requiredLoDetails;
    @Input() loanOfficerData: ILODetail;
    @Output() openLOSearch: EventEmitter<any> = new EventEmitter();
    loDetailsArray: string[];
    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        let chng = changes['requiredLoDetails'];
        if (!!chng) {
            if (!!chng.currentValue) {
                let cur = chng.currentValue;
                this.loDetailsArray = Object.keys(cur);
            }
        }
    }

    goToLOSearch(event: any) {
        this.openLOSearch.emit(event);
    }

}