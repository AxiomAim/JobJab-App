import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { concat, map, Observable, of, Subject } from 'rxjs';

@Component({
    selector: 'select-checkbox',
    templateUrl: './select-checkbox.component.html',
    standalone: true,
    imports: [
        NgSelectModule,
        FormsModule,
		ReactiveFormsModule
    ],
})
export class SelectCheckboxComponent implements OnInit {
	@Input() itemFormControl: FormControl;
	// @Input() itemGroup: FormGroup;
	@Input() items$: Observable<any[]>;
	@Input() items: any[] = [];
	itemLoading = false;
	@Input() itemInput$ = new Subject<string>();
	@Input() selectedItems: any[];
	@Input() bindLabel: string = 'name';
	@Input() bindValue: string = 'id';
	@Input() labelName: string = 'Select Items';

  	@Output() selectedOption: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
        
    }

	ngOnInit() {

	}

	trackByFn(item: any) {
		return item.id;
	}

	optionSelected(event: any) {	
		console.log('optionSelected:event', event);
		this.selectedOption.emit(this.selectedItems);
	}
}