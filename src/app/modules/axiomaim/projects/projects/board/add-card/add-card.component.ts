import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsV2Service } from '../../ProjectsV2.service';
import { ProjectCard, ProjectCardModel } from '../../project-card.model';

@Component({
    selector: 'projects-board-add-card',
    templateUrl: './add-card.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        NgClass,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        TextFieldModule,
    ],
})
export class ProjectsBoardAddCardComponent implements OnInit, AfterViewInit {
    _projectsV2Service = inject(ProjectsV2Service);
    @ViewChild('titleInput') titleInput: ElementRef;
    @ViewChild('titleAutosize') titleAutosize: CdkTextareaAutosize;
    @Input() newCard: boolean = true;
    @Input() buttonTitle: string = 'Add a card';
    @Output() readonly onAddCard: EventEmitter<ProjectCard> = new EventEmitter<ProjectCard>();

    card: ProjectCard = ProjectCardModel.emptyDto();
    cardForm: UntypedFormGroup;
    formVisible: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.cardForm = this._formBuilder.group({
            id: [null],
            title: [null],
        });    
    }

    ngAfterViewInit(): void {
        if(this.newCard) {
            this.card = ProjectCardModel.emptyDto();
            // Initialize the new list form
            this.cardForm.patchValue(this.card);
        }

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save
     */
    addCard(): void {
        // Get the new list title
        this.card = { ...this.card, ...this.cardForm.value}
        // Execute the observable
        this.onAddCard.emit(this.card);
        // this.saved.next(title.trim());

        // Clear the new list title and hide the form
        this.formVisible = false;
        this.cardForm.get('title').setValue('');

        // Reset the size of the textarea
        setTimeout(() => {
            this.titleInput.nativeElement.value = '';
            this.titleAutosize.reset();
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the visibility of the form
     */
    toggleFormVisibility(): void {
        // Toggle the visibility
        this.formVisible = !this.formVisible;

        // If the form becomes visible, focus on the title field
        if (this.formVisible) {
            this.titleInput.nativeElement.focus();
        }
    }
}
