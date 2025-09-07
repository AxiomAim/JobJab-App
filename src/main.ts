import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import { registerLicense } from '@syncfusion/ej2-base';
import { setLicenseKey } from "survey-core";


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

