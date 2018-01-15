
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MdlTextFieldModule, MdlButtonModule, MdlCardModule, MdlShadowModule, MdlRadioModule, MdlRadioGroupRegisty } from '@angular-mdl/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MdlTextFieldModule,
    MdlButtonModule,
    MdlCardModule,
    MdlShadowModule,
    MdlRadioModule
  ],
  providers:[MdlRadioGroupRegisty],
  declarations: [
    LoginComponent
  ]
})
export class LoginModuleModule { }
