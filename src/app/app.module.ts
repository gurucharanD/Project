import { AuthGuard } from './auth.guard';
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
import {UserAccountService} from './user-account.service'


import { AppComponent } from './app.component';

import { EditorComponent } from './editor/editor.component';
import {RegisterService} from './register.service';
import { PostQuestionComponent } from './post-question/post-question.component';
import { CopyrightsComponent } from './copyrights/copyrights.component';
import { FacultyMenuComponent } from './faculty-menu/faculty-menu.component';
import { KeysPipe } from './keys.pipe';
import { ShowQuestionsFacultyComponent } from './show-questions-faculty/show-questions-faculty.component';

import {MdlButtonModule,MdlLayoutModule,MdlScreenSizeService} from '@angular-mdl/core';
import { HomeComponent } from './home/home.component'




@NgModule({
  declarations: [

    AppComponent,
    EditorComponent,
   PostQuestionComponent,
    CopyrightsComponent,
    FacultyMenuComponent,
    KeysPipe,
    ShowQuestionsFacultyComponent,
    HomeComponent
  
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    routes,
    MdlLayoutModule,
  ],
  providers: [AuthGuard,UserAccountService,CookieService,QueServiceService,LoginService,RegisterService,MdlScreenSizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
