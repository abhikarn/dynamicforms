import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ControlProperty, ILocationDetails, ILocation } from '../../../models';
import { RestService } from '../../../../common';

@Component({
    selector: 'location',
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {
    error: string = '';
    disableDropdown: boolean = false;
    stateControl: any;
    cityControl: any;
    countyControl: any;
    zipCode: string = null;
    showLoader: boolean = false;

    options: ILocation = {
        hideZip: false,
        zipPlaceholder: 'Zipcode',
        isZipFirst: true,
        hideState: false,
        hideCity: false,
        hideCounty: false,
        styleClass: 'col-sm-6',
        validateZipAndPopulate: true
    };

    @Input() control: ControlProperty;
    @Input() isValidZip: boolean;

    @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
    @Output() fetchLocationDetails: EventEmitter<string> = new EventEmitter<string>();

    constructor(private restService: RestService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.options = Object.assign({}, this.options, this.control.location);
        this.setInitialState();
        let controlValue = <ILocationDetails>this.control.value;
        // this showing as empty alwaysconsole.log(this.isObjectEmpty(controlValue));
        if (!!controlValue && !!controlValue.stateName) {
            // this.zipCode = !!this.control.value[0] ? this.control.value[0] : '';
            // this.stateControl.value = !!this.control.value[1] ? this.control.value[1] : '';
            // this.cityControl.value = !!this.control.value[3] ? this.control.value[3] : '';
            // this.countyControl.value = !!this.control.value[4] ? this.control.value[4] : '';
            this.zipCode = !!controlValue.postalCode ? controlValue.postalCode : '';
            this.stateControl.value = !!controlValue.stateName ? controlValue.stateName : '';
            this.cityControl.value = !!controlValue.cityName ? controlValue.cityName : '';
            this.countyControl.value = !!controlValue.countyName ? controlValue.countyName : '';
            this.selectedLocation.emit({ stateName: this.stateControl.value, cityName: this.cityControl.value, countyName: this.countyControl.value, postalCode: this.zipCode });
        }
    }
    setInitialState(resetDropdowns?: boolean) {
        //logic to make the input data to dropdown as not null.
        //UI fix
        this.disableDropdown = false;
        this.stateControl = { placeholder: 'State' };
        this.cityControl = { placeholder: 'City' };
        this.countyControl = { placeholder: 'County' };
        if (resetDropdowns) {
            this.selectedLocation.emit({ event: null, resetFormGroup: true });
        } else {
            this.selectedLocation.emit();
        }
        this.stateControl = this.route.snapshot.data['getAllStates'].json.controls[0];
        this.stateControl = Object.assign({}, this.stateControl, { placeholder: 'State', value: '' });
    }

    checkForLocationDetails(event: any) {
        let zip = event.target.value;
        let isInputCleared: boolean = event.data ? false : true; //event.data return 'null' on press on backspace or delete
        this.zipCode = zip.replace(/-| /g, '');
        if (this.options.validateZipAndPopulate) {
            if (+zip.length === 5) {
                this.showLoader = true;
                this.restService.getData('finexpuiapp', 'isZipCodeValid', zip).subscribe(
                    res => {
                        let zipDetails: ILocationDetails = res.json;
                        if (zipDetails) {
                            //added setTimeout to avoid the EXPRESSION HAS CHANGED ERROR, only god knows why
                            setTimeout(() => {
                                this.disableDropdown = zipDetails.serviceFlag ? true : false;
                                if (typeof zipDetails.serviceFlag !== 'undefined') {
                                    if (!zipDetails.serviceFlag) {
                                        this.setInitialState();
                                    }
                                    this.error = !!zipDetails.message ? zipDetails.message : null;
                                    this.stateControl = { value: zipDetails.stateName };
                                    // this.cityControl.value = this.zipDetails.cityName;
                                    // this.countyControl.value = this.zipDetails.countyName;
                                    this.cityControl = { value: zipDetails.cityName };
                                    this.countyControl = { value: zipDetails.countyName };
                                    this.zipCode = zipDetails.postalCode;
                                    this.selectedLocation.emit({ stateName: this.stateControl.value, cityName: this.cityControl.value, countyName: this.countyControl.value, postalCode: this.zipCode, stateCode: zipDetails.stateCode });
                                } else {
                                    this.error = zipDetails.message;
                                    this.setInitialState();
                                }
                            }, 0);
                        }
                        this.showLoader = false;
                    },
                    err => {
                        this.showLoader = false;
                    }
                );
            }
            if (isInputCleared) {
                this.setInitialState(true);
            }
        }
    }

    OnDropdownSelect(value: string, field: string) {
        this.error = null;
        let eventParam: string = value;
        if (field === 'state') {
            this.zipCode = null;
            if (this.stateControl.value !== value) {   //prevent service hits if the option selected is selected again
                this.stateControl.value = value;
                this.cityControl.value = null;
                this.countyControl.value = null;
                this.restService.getData('finexpuiapp', `getCitiesByState/${this.stateControl.value}`).subscribe(res => this.cityControl = res.json.controls[0]);
            }
        } else if (field === 'city') {
            if (this.cityControl.value !== eventParam) {
                this.cityControl.value = eventParam;
                this.restService.getData('finexpuiapp', `getCountiesByCity/${this.stateControl.value}/${this.cityControl.value}`).subscribe(res => this.countyControl = res.json.controls[0]);
            }
            let stateCode = this.stateControl.options.find((state) => state.value === this.stateControl.value).name;
            this.selectedLocation.emit({ stateName: this.stateControl.value, cityName: this.cityControl.value, stateCode: stateCode });
        } else if (field === 'county') {
            this.countyControl.value = value;
            let stateCode = this.stateControl.options.find((state) => state.value === this.stateControl.value).name;
            this.selectedLocation.emit({ stateName: this.stateControl.value, cityName: this.cityControl.value, countyName: this.countyControl.value, stateCode: stateCode });
        }
    }

    filterZipcode(event: any) {
        let value: string = event.target.value.trim().replace(/[^0-9]*/g, '');
        if (value === '') {
            // this.form.controls[this.control.id].setValue(value);
            return;
        }
        let zipCode: string;
        let zipcodeAddon: string;
        switch (value.length) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                zipCode = value;
                break;
            default:
                zipCode = value.slice(0, 5);
                zipcodeAddon = value.slice(5);
        }
        if (zipcodeAddon) {
            if (zipcodeAddon.length > 4) {
                zipcodeAddon = zipcodeAddon.slice(0, 4);
            }
            else {
                zipcodeAddon = zipcodeAddon;
            }

            event.target.value = (zipCode + '-' + zipcodeAddon).trim();
        }
        else {
            event.target.value = zipCode;
        }
        // this.keypress.emit({ event: event, param: JSON.stringify(this.control) });
    }

    isObjectEmpty(obj): boolean {
        return Object.keys(obj).length > 0;
    }
}