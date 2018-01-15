import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers/developers.component';
import { MdlCardModule, MdlButtonModule, MdlShadowModule, MdlTextFieldModule } from '@angular-mdl/core';

@NgModule({
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    MdlCardModule,
    MdlButtonModule,
    MdlShadowModule,
    MdlTextFieldModule
  ],
  declarations: [DevelopersComponent]
})
export class DevelopersModule { }
