import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {EditorComponent} from './editor/editor.component'
import {RegisterUserComponent} from './register-user/register-user.component'
import {FacultyLoginComponent} from './faculty-login/faculty-login.component'
import {PostQuestionComponent} from './post-question/post-question.component'
 
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {AppComponent} from './app.component'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';



export const router:Routes =[
    {path:'',component:HomeComponent,pathMatch:'full'},
    {path:'registerUser',loadChildren:'./register-user/register.module#RegisterModule'},
    {path:'home',component:HomeComponent},
    {path:'login',loadChildren:'./login/login-module.module#LoginModuleModule'},
    {path:'facultyLogin',loadChildren:'./faculty-login/faculty-login.module#FacultyLoginModule'},
    {path:'postQuestion',component:PostQuestionComponent},
    {path:'editor',canActivate:[AuthGuard],component:EditorComponent},
    {path:'dashboard',canActivate:[AuthGuard],loadChildren:'./dashboard/dashboard.module#DashboardModule'},
    {path:'developers',loadChildren:'./developers/developers.module#DevelopersModule'}

];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);