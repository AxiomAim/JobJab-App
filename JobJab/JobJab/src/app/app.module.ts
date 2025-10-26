import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SyncChartModule } from './app-shell/chart/chart.module';
import { SyncGridModule } from './app-shell/grid/grid.module';
import { SyncScheduleModule } from './app-shell/schedule/schedule.module';
import { NavBarComponent } from './app-shell/nav-bar/nav-bar.component';
import { FooterComponent } from './app-shell/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent, 
	NavBarComponent, 
	FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SyncChartModule,
    SyncGridModule,
    SyncScheduleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
