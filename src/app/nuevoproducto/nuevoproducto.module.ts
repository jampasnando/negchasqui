import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoproductoPageRoutingModule } from './nuevoproducto-routing.module';

import { NuevoproductoPage } from './nuevoproducto.page';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FileUploadModule,
    NuevoproductoPageRoutingModule,
  ],
  declarations: [NuevoproductoPage]
})
export class NuevoproductoPageModule {}
