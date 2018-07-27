import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit, ViewChild
} from '@angular/core';
import {
    FormGroup
} from '@angular/forms';

import { SelectItem } from 'primeng/primeng';
import { ControlProperty } from '../../models';

@Component({
    selector: 'multidropdown',
    templateUrl: './multidropdown.component.html'
})
export class MultiDropDownComponent implements OnInit {

    @Input() controls: ControlProperty;
    @Input() formGroup: FormGroup;
    dropdownOptions: SelectItem[] = [];
    value: Array<any>;
    // @Output() onSelect: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();

    @ViewChild('multiSelect') multiSelect: any;

    selectedValues: Array<String> = [];

    ngOnInit() {
        for (let entry of this.controls.options) {
            this.dropdownOptions.push({ label: entry.name, value: entry.value });
        }
        this.multiSelect.defaultLabel = !!this.controls.value ? this.controls.value : this.controls.placeholder;
        let divElement: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('ui-multiselect-filter-container')[0];
        if (divElement) {
            divElement.getElementsByTagName('input')[0].value = 'All';
            divElement.getElementsByTagName('input')[0].readOnly = true;
        }
        if (!!this.formGroup.controls[this.controls.id].value) {
            if (typeof (this.formGroup.controls[this.controls.id].value) === 'string') {
                this.multiSelect.value = this.formGroup.controls[this.controls.id].value.split(',');
            } else {
                this.multiSelect.value = this.formGroup.controls[this.controls.id].value;
            }
        }
    }

    getValue(event) {
        this.multiSelect.defaultLabel = this.controls.placeholder;
        this.value = event.value;
        if (!this.value || this.value.length === 0) {
            this.value = null;
        }
        this.formGroup.controls[this.controls.id].markAsTouched({ onlySelf: true });
        this.formGroup.controls[this.controls.id].setValue(this.value);
        this.controls.value = this.value ? this.value.join() : null;
        this.change.emit(this.value);
    }
}