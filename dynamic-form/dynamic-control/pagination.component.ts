import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'pagination-component',
    template: `
    <p-paginator class="complete-center" rows="{{pageSize}}" totalRecords="{{totalItems}}" (onPageChange)="paginate($event)" ></p-paginator>
  `
})
export class PaginationComponent {
    @Input() totalItems: string;
    @Input() pageSize: string;
    @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
    paginate(event) {
        this.onPageChange.emit(event.page + 1);
    }
}