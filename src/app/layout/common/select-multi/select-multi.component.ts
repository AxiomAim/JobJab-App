import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { concat, Observable, of, Subject } from 'rxjs';

@Component({
    selector: 'select-multi',
    templateUrl: './select-multi.component.html',
    standalone: true,
    imports: [
        NgSelectModule,
        AsyncPipe,
        FormsModule,
		ReactiveFormsModule
    ],
})
export class SelectMultiComponent implements OnInit {
	@Input() itemFormControl: FormControl;
	// @Input() itemGroup: FormGroup;
	@Input() items$: Observable<any[]>;
	@Input() items: any[];
	itemLoading = false;
	@Input() itemInput$ = new Subject<string>();
	@Input() selectedItems: any[];
	@Input() bindLabel: string = 'hierarchId';
	@Input() labelName: string = 'Select Items';
	@Input() multiple: boolean = true;

  	@Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
        
    }

	ngOnInit() {

    }

	trackByFn(item: any) {
		return item.id;
	}

	onOptionSelected() {		
		this.optionSelected.emit(this.selectedItems);
	}

	clearModel() {
		this.selectedItems = [];
	}

	changeModel() {
		this.selectedItems = [{ name: 'New Item' }];
	}
}