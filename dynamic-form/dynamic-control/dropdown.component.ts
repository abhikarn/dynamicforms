import { Component, Input, Output, EventEmitter, OnInit, SimpleChange, ViewChild, ElementRef, AfterViewInit, SimpleChanges } from '@angular/core';
import { ControlProperty, Option, ILocationDetails } from '../../models';

@Component({
    selector: 'dropdown-select',
    templateUrl: './dropdown.component.html',
    host: {
        '(document: click)': 'clearSearch($event)'
    }
})
export class DropDownComponent implements OnInit, AfterViewInit {
    selectedvalue: string | ILocationDetails;
    optionsToDisplay: Option[];
    changeClass: boolean = true;


    @Input() control: ControlProperty;
    @Input() disableDropdown: boolean;

    @Output() dropdownSelect: EventEmitter<any> = new EventEmitter();
    @ViewChild('filterEle') filterElement: ElementRef;
    @ViewChild('dropdownList') dropdownList: ElementRef;

    constructor(private elementRef: ElementRef) { }
    ngAfterViewInit() {
        let dynamicScript = document.createElement('script');
        dynamicScript.text = this.script;
        this.elementRef.nativeElement.appendChild(dynamicScript);
    }

    ngOnInit() {
        if (!!this.control) {
            this.selectedvalue = !this.control.value ? this.control.placeholder : this.control.value;
            this.optionsToDisplay = !!this.control.options ? this.control.options : [];
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        this.selectedvalue = this.control.value || this.control.placeholder;
        this.optionsToDisplay = this.control.options;
    }
    clearSearch(event) {
        if (!this.dropdownList.nativeElement.contains(event.target)) {
            if (!!this.filterElement) {
                this.filterElement.nativeElement.value = null;
                this.optionsToDisplay = this.control.options;
            }
        }
    }

    onclick(option: Option, event: any) {
        this.selectedvalue = option.value;
        this.dropdownSelect.emit(this.selectedvalue);
        this.changeClass = false;
    }

    filter(event: any) {
        if (this.control.options && this.control.options.length) {
            let val = event.target.value.toLowerCase();
            this.optionsToDisplay = [];
            for (let i = 0; i < this.control.options.length; i++) {
                let option = this.control.options[i];
                if (option.value.toLowerCase().indexOf(val) > -1) {
                    this.optionsToDisplay.push(option);
                }
            }
        }
    }
    private script: string = `

            `;
}