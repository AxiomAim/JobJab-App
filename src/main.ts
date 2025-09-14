import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import { registerLicense } from '@syncfusion/ej2-base';
import { setLicenseKey } from "survey-core";
import { catchError, from, Observable, of, throwError } from 'rxjs';
import { Inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';


bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);

setLicenseKey(
  "Njg5NmJjNTktNTViZS00ZDRmLWI2MDgtYmQxMDM4NzAyYzdlOzE9MjAyNS0wMS0yNSwyPTIwMjUtMDEtMjUsND0yMDI1LTAxLTI1"
);

// syncfusion licence key v25+
registerLicense(
  'ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adk1jXHpfcHxXQ2Be'
    // 'ORg4AjUWIQA/Gnt2UVhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adkBiWntbcn1cRWZV'
)

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private mapsLoaded = false;
  private scriptLoading = false;
  
  // private apiKey: string = 'AIzaSyCHOl5pEV3Lk-vCE0OJqHDcDWYNFRajpEA';  //  <------------------------  Replace with your API key
  private apiKey: string = 'AIzaSyDBl6uBR-HISRRMHLfyxeI-qmFuL6R6NTw';  //  <------------------------  Replace with your API key

  constructor(
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) { }

  loadGoogleMaps(): Observable<void> {
    if (this.mapsLoaded) {
      return of(void 0);
    }
    if (this.scriptLoading) {
      return new Observable(observer => {
        const interval = setInterval(() => {
          if (this.mapsLoaded) {
            clearInterval(interval);
            observer.next(void 0);
            observer.complete();
          }
        }, 100);
      });
    }

    this.scriptLoading = true;
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    this.document.body.appendChild(script);

    return from(new Promise<void>((resolve, reject) => {
      script.onload = () => {
        this.zone.run(() => {
          this.mapsLoaded = true;
          this.scriptLoading = false;
          resolve();
        });
      };
      script.onerror = (error) => {
        this.zone.run(() => {
          this.scriptLoading = false;
          reject(error);
        });
      };
    })).pipe(
      catchError(err => {
        console.error('Failed to load Google Maps API script', err);
        return throwError(() => err);
      })
    );
  }

  isMapsLoaded(): boolean {
    return this.mapsLoaded;
  }
}



