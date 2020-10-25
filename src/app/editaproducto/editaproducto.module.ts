import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaproductoPageRoutingModule } from './editaproducto-routing.module';

import { EditaproductoPage } from './editaproducto.page';
import { ServiciosService } from '../service/servicios.service';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FileUploadModule,
    EditaproductoPageRoutingModule
  ],
  declarations: [EditaproductoPage],
  providers:[ServiciosService]
})
export class EditaproductoPageModule {}
