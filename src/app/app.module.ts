import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RouterModule, Routes } from '@angular/router';
import {routes} from './app.router';
import {QueServiceService} from './que-service.service'
import {LoginService} from './login-service.service'
import { HttpModule } from '@angular/http';
import {Http} from '@angular/http'


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import {RegisterService} from './register.service';
import { FacultyLoginComponent } from './faculty-login/faculty-login.component';
import { PostQuestionComponent } from './post-question/post-question.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EditorComponent,
    RegisterUserComponent,
    FacultyLoginComponent,
    PostQuestionComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    routes
  ],
  providers: [CookieService,QueServiceService,LoginService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
