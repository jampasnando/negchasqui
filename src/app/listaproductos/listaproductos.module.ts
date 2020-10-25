import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaproductosPageRoutingModule } from './listaproductos-routing.module';

import { ListaproductosPage } from './listaproductos.page';
import { ServiciosService } from '../service/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import { NuevoproductoPage } from '../nuevoproducto/nuevoproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ListaproductosPageRoutingModule
  ],
  declarations: [ListaproductosPage],
  providers:[ServiciosService,NuevoproductoPage]
})
export class ListaproductosPageModule {}
