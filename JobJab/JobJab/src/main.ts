import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

//Register Syncfusion license
registerLicense('YOUR LICENSE KEY');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
