import { Component, EventEmitter, inject, Inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage'; // Import getDownloadURL
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'cloud-storage',
    template: `
        <input id="fileUpload" type="file" [accept]="accept" #upload hidden (change)="uploadFile($event)">
        <button mat-button (click)="upload.click()" [class]="classInfo" [matTooltip]="tooltip">
            <mat-icon [class]="classInfo" [svgIcon]="icon"></mat-icon>
            <span class="ml-1">{{ title }}</span>
        </button>
        <!-- <button mat-flat-button [color]="'primary'" (click)="upload.click()">
            <mat-icon [svgIcon]="'mat_solid:add'"></mat-icon>
            <span class="ml-2 mr-1">Upload file</span>
        </button> -->
    `,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatInputModule, MatTooltipModule],
})
export class CloudStorageComponent {
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    @Input() classInfo: string = 'text-primary';
    @Input() icon: string = 'add';
    @Input() title: string = 'Upload File';
    @Input() tooltip: string = 'Upload File';
    @Input() bucket: string = 'organizations';
    @Input() type: string = 'image'; // Consider using MIME type for accuracy (e.g., 'image/jpeg')
    @Input() accept: string = 'image/jpeg, image/png';
    @Output() setFile = new EventEmitter<any>();

    constructor(
        @Inject(Storage) private readonly storage: Storage,
        private _axiomaimLoadingService: AxiomaimLoadingService,
    ) { }

    uploadFile(event: any) {
        this._axiomaimLoadingService.show();
        const file = event.target.files[0];

        // if (!file || !this.isValidType(file)) {
        //     console.log('isValidType')
        //     this._davesaLoadingService.hide();
        //     return;
        // }
        
        const fileName = ref(this.storage, `${uuidv4().toString()}_${file.name}`);
        const storageRef = ref(this.storage, `${this.bucket}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.then((snapshot) => { // Use then() for completion
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                const asset = {
                    fileName: fileName,
                    fileType: file.type,
                    filePath: storageRef.fullPath,
                    fileUrl: downloadURL,
                    // ... other properties you need ...
                };
                console.log('asset', asset)
                this._axiomaimLoadingService.hide();
                this.setFile.emit(asset);
            }).catch((error) => {
                console.error("Error getting download URL:", error);
                this._axiomaimLoadingService.hide();
                // Handle the error
            });
        }).catch((error) => {
            console.error("Upload error:", error);
            this._axiomaimLoadingService.hide();
            // Handle the error
        });
    }

    openPdf(item: any) {
        window.open(item.url, '_blank');
      }


    isValidType(file: File): boolean {
        console.log('file', file)
        // For more accurate validation, use:
        // return file.type.startsWith('image/'); 
        return file.type === this.type; 
    }
}