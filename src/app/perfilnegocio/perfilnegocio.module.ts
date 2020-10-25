import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilnegocioPageRoutingModule } from './perfilnegocio-routing.module';

import { PerfilnegocioPage } from './perfilnegocio.page';
import { ServiciosService } from '../service/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    FileUploadModule,
    PerfilnegocioPageRoutingModule
  ],
  declarations: [PerfilnegocioPage],
  providers:[ServiciosService]
})
export class PerfilnegocioPageModule {}
