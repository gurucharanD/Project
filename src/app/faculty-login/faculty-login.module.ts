import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyLoginRoutingModule } from './faculty-login-routing.module';
import { FacultyLoginComponent } from './faculty-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlCardModule, MdlTextFieldModule, MdlButtonModule, MdlShadowModule } from '@angular-mdl/core';

@NgModule({
  imports: [
    CommonModule,
    FacultyLoginRoutingModule,
    FormsModule,
    MdlCardModule,
    ReactiveFormsModule,
    MdlTextFieldModule,
    MdlButtonModule,
    MdlShadowModule
  ],
  declarations: [
    FacultyLoginComponent
  ]
})
export class FacultyLoginModule { }
