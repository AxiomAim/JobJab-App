/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import { setLicenseKey } from "survey-core";
import { catchError, Observable, of, Subject, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';


bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);

setLicenseKey(
  "Njg5NmJjNTktNTViZS00ZDRmLWI2MDgtYmQxMDM4NzAyYzdlOzE9MjAyNS0wMS0yNSwyPTIwMjUtMDEtMjUsND0yMDI1LTAxLTI1"
);

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private mapsLoaded = false;
  private scriptLoading = false;
  private loadObservable: Observable<void> | null = null;
  
  // private apiKey: string = 'AIzaSyCHOl5pEV3Lk-vCE0OJqHDcDWYNFRajpEA';  //  <------------------------  Replace with your API key
  private apiKey: string = 'AIzaSyAwefNH09xGlIqzY8j6xuBprX7m1VBil5k';  //  <------------------------  Replace with your API key

  constructor(
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) { }

  loadGoogleMaps(): Observable<void> {
    if (this.mapsLoaded) {
      return of(void 0);
    }

    if (this.loadObservable) {
      return this.loadObservable;
    }

    this.loadObservable = this.createScriptLoad();
    return this.loadObservable;
  }

  private createScriptLoad(): Observable<void> {
    this.scriptLoading = true;

    const subject = new Subject<void>();
    const callbackName = `onGoogleMapsLoad_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;

    (window as any)[callbackName] = () => {
      delete (window as any)[callbackName];
      this.zone.run(() => {
        this.mapsLoaded = true;
        subject.next(void 0);
        subject.complete();
      });
    };

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places&loading=async&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    this.document.head.appendChild(script);

    const timeout = setTimeout(() => {
      if (!subject.closed) {
        delete (window as any)[callbackName];
        this.zone.run(() => {
          this.scriptLoading = false;
          subject.error(new Error('Failed to load Google Maps: Timeout'));
        });
      }
    }, 10000);

    return subject.asObservable().pipe(
      finalize(() => {
        clearTimeout(timeout);
        this.zone.run(() => {
          this.scriptLoading = false;
        });
      }),
      catchError(err => {
        console.error('Failed to load Google Maps API script', err);
        this.loadObservable = null;
        return throwError(() => err);
      })
    );
  }

  isMapsLoaded(): boolean {
    return this.mapsLoaded;
  }
}