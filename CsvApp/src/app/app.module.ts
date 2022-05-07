import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { ShowDataCsvComponent } from './components/show-data-csv/show-data-csv.component';
import { HttpClientModule }    from '@angular/common/http';
import { GetDataComponent } from './components/get-data/get-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowDataCsvComponent,
    GetDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
