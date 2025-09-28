import { Component, ElementRef, inject, OnInit, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject, finalize, map, Observable, Subject, switchMap, switchMapTo, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DavesaLoadingService } from '@davesa/services/loading';
import { Router } from '@angular/router';
import { IconPickerComponent } from '@davesa/components/icon-picker/icon-picker.component';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { ProtocolsV2Service } from '../../ProjectsV2.service';
import { TBoard, TList } from '../../project-template.model';
import { ProtocolsV2TemplatesService } from '../../ProtocolsV2Template.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
    selector: 'protocols-template-add-board',
    templateUrl: './add-board.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatRippleModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        TextFieldModule,
        // DavesaLoadingBarComponent,
        IconPickerComponent,
        
        // IconsComponent
    ],
})
export class ProtocolsTemplateAddBoardComponent implements OnInit {
    _protocolsV2TemplatesService = inject(ProtocolsV2TemplatesService);
    _protocolsV2Service = inject(ProtocolsV2Service);
    protocol = inject(MAT_DIALOG_DATA);
    _router = inject(Router);
    _davesaLoadingService = inject(DavesaLoadingService);
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    board: TBoard = {} as TBoard;
    lists: TList[] = [];    

    loginUser: User;
    organization: Organization;

    addTemplateForm: UntypedFormGroup;
    countdown: number = 5;
    fileFormat: "image/png, image/jpeg";
    position: number = 1;

    selectedIcon: any = ['davesa', 'davesa-c']
    iconSize: any = 'icon-size-16';


    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ProtocolsTemplateAddBoardComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _overlay: Overlay,
        private _renderer2: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _davesaConfirmationService: DavesaConfirmationService

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */ 
    ngOnInit(): void {
        this.loginUser = this._protocolsV2Service.loginUser();
        this.organization = this._protocolsV2Service.organization();
        console.log('loginUser', this.loginUser);
        console.log('organization', this.organization);
        this.board.id = uuidv4().toString();

        // Create the form
        this.addTemplateForm = this._formBuilder.group({
            title: [this.protocol.title, [Validators.required]],
            icon: ['', [Validators.required]],
            description: ['', [Validators.required]],
            lists: this._formBuilder.array([]),

        });

        // Setup the phone numbers form array
        const listsFormGroups: UntypedFormGroup[] = [];
        var list: TList = {} as TList;
        list.orgId = this.organization.id;
        list.userId = this.loginUser.id;
        list.boardId = this.board.id;
        list.position = this.position;
        this.position = this.position + 1;
        list.sort = this.position;
        this.lists.push(list);
        
        if (this.lists.length > 0) {
            // Iterate through them
            this.lists.forEach((list) => {
                // Create an email form group
                listsFormGroups.push(
                    this._formBuilder.group({
                        id: [null],
                        boardId: [null],
                        sort: [list.position],
                        position: [list.position],
                        title: [list.title],
                        cards: [this._formBuilder.array([])],
                    })
                );
            });
        } else {
            // Create a phone number form group
            listsFormGroups.push(
                this._formBuilder.group({
                    id: [list.id],
                    boardId: [list.boardId],
                    sort: [list.sort],
                    position: [list.position],
                    title: [list.title],
                })
            );
        }

        // Add the phone numbers form groups to the phone numbers form array
        listsFormGroups.forEach((listFormGroup) => {
            (this.addTemplateForm.get('lists') as UntypedFormArray).push(listFormGroup);
        });
        
        // Patch values to the form
        this.addTemplateForm.patchValue(this.board);

        this.onIconPickerSelect();
        // Mark for check
        this._changeDetectorRef.markForCheck();
            
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSubmit(): void {
        if (this.addTemplateForm.valid) {
            const myLists: TList[] = [];
            let sort = 0;
            (this.addTemplateForm.get('lists') as UntypedFormArray).controls.forEach(element => {
                const newList: TList = {} as TList;
                newList.title = element.get('title').value;
                newList.position = sort;
                sort = sort + 1;
                newList.sort = sort;
                newList.orgId = this.organization.id;
                newList.userId = this.loginUser.id;
                newList.boardId = this.board.id;
                myLists.push(newList);
            });
            console.log('myLists', myLists)
            this.protocol.title = this.addTemplateForm.get('title').value;
            this.protocol.boardId = this.board.id;
            this.board.orgId = this.organization.id;
            this.board.userId = this.loginUser.id;
            this.board.title = this.addTemplateForm.get('title').value;
            this.board.icon = this.addTemplateForm.get('icon').value;
            this.board.description = this.addTemplateForm.get('description').value;
            this.board.lists = myLists;
            this.board.labels = [];
            this.board.tags = [];
            this.board.active = true;
            this.board.startAt = null;
            this.board.endAt = null;
            this.board.closeAt = null;
            this.board.lastActivity = null;
            console.log('this.board', this.board);
            this._protocolsV2TemplatesService.createItem(this.board).pipe(
                switchMap((resBoard) => {
                    this.protocol.templateId = this.board.id;
                        return this._protocolsV2Service.updateProtocol(this.protocol.id, this.protocol).pipe(map(() => {
                            return resBoard;
                        }));
                }),
                tap(() => {
                    this._router.navigate(['/davesa/manager/protocols/template' + this.board.id]);
                    this.matDialogRef.close(this.protocol);
                })
            ).subscribe((res) => {
                console.log('res', res);
            });
        }
            return;
    }
    
    
    selectedOption(event: any) {
        this.addTemplateForm.get('protocolRoles').setValue(event);
        console.log('selectedOption:form', this.addTemplateForm.get('protocolRoles').value);
    }

    close() {
        this.matDialogRef.close();
    }

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {}

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {}

    /**
     * Send the message
     */
    send(): void {}


    /**
     * Add the email field
     */
    addListField(): void {
        // var newProtocolList: ProtocolList = ProtocolListModel.emptyDto();
        const newProtocolList: TList = {} as TList;
        newProtocolList.boardId = this.board.id;
        newProtocolList.position = this.position;
        this.position = this.position + 1;
        newProtocolList.sort = this.position;

        // Create an empty email form group
        const listFormGroup = this._formBuilder.group({
            id: [newProtocolList.id],
            boardId: [newProtocolList.boardId],
            sort: [newProtocolList.sort],
            position: [newProtocolList.position],
            title: [newProtocolList.title],
        });

        // Add the email form group to the emails form array
        (this.addTemplateForm.get('lists') as UntypedFormArray).push(
            listFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeListField(index: number): void {
        this.position = this.position - 1;

        // Get form array for emails
        const listsFormArray = this.addTemplateForm.get(
            'lists'
        ) as UntypedFormArray;

        // Remove the email field
        listsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    setScheme(event:any) {
    
    }
    
    setTheme(event:any) {
    
    }
    
    onIconPickerSelect(data?:any):void{
        if(data){
            this.selectedIcon = data;
        } 
        this.addTemplateForm.get('icon').setValue(this.selectedIcon);
    }

    onIconChange(data: any) {
        console.log('onIconChange', data);

    }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
