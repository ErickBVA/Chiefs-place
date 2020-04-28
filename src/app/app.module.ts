import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {ProfileComponent} from './Components/profile/profile.component';
import {AppComponent} from './app.component';
import {HttpErrorService} from './Services/Halo5/httpError.service';
import {HeaderComponent} from './Components/Header/header.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
