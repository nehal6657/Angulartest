import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneComponent } from './one/one.component';
import { HttpClientModule } from '@angular/common/http';
import { ApicallService } from './services/apicall.service';
import { CommonModule } from '@angular/common';
import { TwoComponent } from './two/two.component';
 
@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
    TwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    ApicallService
  ],
  

  bootstrap: [AppComponent]
})
export class AppModule { }
