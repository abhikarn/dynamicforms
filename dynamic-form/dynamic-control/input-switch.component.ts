import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';
import {
    FormGroup
} from '@angular/forms';

import { ControlProperty } from '../../models';

@Component({
    selector: 'input-switch',
    template: `<div class="{{controls.class}}" [class.hide]="controls.hideElement">
		<p-inputSwitch onLabel="Yes" offLabel="No" (onChange)="handleChange($event)" [(ngModel)]="isChecked"></p-inputSwitch>
	</div>
`
})
export class InputSwitchComponent implements OnInit {

    @Input() controls: ControlProperty;
    @Input() formGroup: FormGroup;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    isChecked: boolean;

    ngOnInit() {
        this.formGroup.controls[this.controls.id].setValue('No');
        if (this.controls.value === 'Yes' || this.controls.value === 'YES') {
            this.isChecked = true;
            this.formGroup.controls[this.controls.id].setValue('Yes');
        }
    }

    handleChange(event) {
        if (event.checked) {
            this.controls.value = 'Yes';
        }
        else {
            this.controls.value = 'No';
        }
        this.formGroup.controls[this.controls.id].setValue(this.controls.value);
        this.onChange.emit(event);
    }

}