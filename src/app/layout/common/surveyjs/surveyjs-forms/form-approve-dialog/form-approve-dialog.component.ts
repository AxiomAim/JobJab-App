import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthDavesaV2Service } from 'app/core/auth-davesa/auth-davesa-v2.service';
import { MatSnackBarService } from 'app/core/services/snackbar-service/snackbar.service';
import { ParticipantsV2Service } from 'app/modules/davesa/apps/participants/participants-v2.service';
import { StudiesV2Service } from 'app/modules/davesa/apps/studies/studies-v2.service';

@Component({
    selector: 'app-form-approve-dialog',
    templateUrl: './form-approve-dialog.component.html',
    styleUrls: ['./form-approve-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class FormApproveDialogComponent implements OnInit {
  private _authDavesaService = inject(AuthDavesaV2Service);
  private _studiesV2Service = inject(StudiesV2Service);
  private _participantsV2Service = inject(ParticipantsV2Service);

  constructor(
    public dialogRef: MatDialogRef<FormApproveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public subjectData: any,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBarService: MatSnackBarService,
  ) {}
  myForm: any;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  saveDocument() {
 
    this._participantsV2Service
      .approveSubjectEsourceForm({
        ...this.myForm.value,
        user_id:this.subjectData.user_id,
        subject_esource_oid:this.subjectData.subject_esource_oid
      })
      .then((res: any) => {
        if (res) {
         
          this._snackBarService.success(res.message);
          if(res.data?.user){
            this.dialogRef.close(res.data?.user);
          }else{
            this.dialogRef.close(true);
          }
        }
      });
  }
  cancelDocument() {
    this.dialogRef.close();
  }

}
