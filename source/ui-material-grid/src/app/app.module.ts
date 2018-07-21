import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import {NgxPopperModule} from 'ngx-popper';

import { MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    ColorPickerModule,
    NgxPopperModule.forRoot({placement: 'bottom', trigger: 'hover'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
