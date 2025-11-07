import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarService } from 'app/core/services/snackbar-service/snackbar.service';
import { FormsV2Service } from 'app/modules/axiomaim/jobjab/forms/forms-v2.service';

@Component({
  selector: 'app-form-approve-dialog',
  templateUrl: './form-approve-dialog.component.html',
  styleUrls: ['./form-approve-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      NgIf,
      NgFor,
      MatButtonModule,
  ]

})
export class FormApproveDialogComponent implements OnInit {
  public _formsV2Service = inject(FormsV2Service);

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
