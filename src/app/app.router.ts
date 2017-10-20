import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {EditorComponent} from './editor/editor.component'
import {RegisterUserComponent} from './register-user/register-user.component'
import {FacultyLoginComponent} from './faculty-login/faculty-login.component'
import {PostQuestionComponent} from './post-question/post-question.component'
 
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {AppComponent} from './app.component'


export const router:Routes =[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'registerUser',component:RegisterUserComponent},
    {path:'login',component:LoginComponent},
    {path:'facultyLogin',component:FacultyLoginComponent},
    {path:'postQuestion',component:PostQuestionComponent},
    {path:'editor',component:EditorComponent},
    {path:'dashboard',component:DashboardComponent}
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);