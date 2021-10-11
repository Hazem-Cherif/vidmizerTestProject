import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CollapseModule , MDBBootstrapModule ,NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    CollapseModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
