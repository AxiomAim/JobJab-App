import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: Storage) { } // Inject the Storage service

  async uploadFile(file: File, path: string): Promise<string | null> {  // Accepts a File object
    try {
      const storageRef = ref(this.storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file); // Upload the File object directly

      return new Promise<string | null>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Error during upload:', error);
            reject(null);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File uploaded successfully. Download URL:', downloadURL);
              resolve(downloadURL);
            } catch (urlError) {
              console.error('Error getting download URL:', urlError);
              reject(null);
            }
          }
        );
      });

    } catch (error) {
      console.error('Error preparing upload:', error);
      return Promise.resolve(null);
    }
  }


  async uploadBase64PNG(base64String: string, path: string): Promise<string | null> {
    try {
      const blob = this.base64ToBlob(base64String);
      const storageRef = ref(this.storage, path); // Use injected Storage

      const uploadTask = uploadBytesResumable(storageRef, blob); // Use uploadBytesResumable

      return new Promise<string | null>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optional: Track upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Error during upload:', error);
            reject(null); // Reject the promise on error
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Get URL from snapshot.ref
              console.log('File uploaded successfully. Download URL:', downloadURL);
              resolve(downloadURL); // Resolve the promise with the URL
            } catch (urlError) {
              console.error('Error getting download URL:', urlError);
              reject(null);
            }
          }
        );
      });
    } catch (error) {
      console.error('Error preparing upload:', error);
      return Promise.resolve(null); // Resolve with null on error
    }
  }


  private base64ToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: 'image/png' });
  }

  // public newFileBase64ToBlob(base64String: string, contentType: string = ''): Blob {
  //   const byteCharacters = atob(base64String.split(',')[1]); // Remove data URL prefix
  //   const byteArrays = [];
  
  //   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
  //     const slice = byteCharacters.slice(offset, offset + 512);
  
  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  
  //     byteArrays.push(new Uint8Array(byteNumbers));
  //   }
  
  //   return new Blob(byteArrays, { type: contentType });
  // }

  public newFileBase64ToBlob(base64String: string, fileName: string, contentType: string = ''): File { // Add fileName parameter
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    const blob = new Blob(byteArrays, { type: contentType }); // Create the Blob (as before)
  
    return new File([blob], fileName, { type: contentType }); // Create and return the File
  }
}