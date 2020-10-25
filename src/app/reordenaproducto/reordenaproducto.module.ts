import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReordenaproductoPageRoutingModule } from './reordenaproducto-routing.module';

import { ReordenaproductoPage } from './reordenaproducto.page';
import { ServiciosService } from '../service/servicios.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReordenaproductoPageRoutingModule
  ],
  declarations: [ReordenaproductoPage],
  providers:[ServiciosService]
})
export class ReordenaproductoPageModule {}
