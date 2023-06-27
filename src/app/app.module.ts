import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AjaxService } from './services/ajax.service';
import { CommonService } from './services/common.service';
import { JwtService } from './services/jwtService';
import { iNavigation } from './services/iNavigation';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CommonService,
    AjaxService,
    iNavigation,
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
