import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DetallepedidoPageRoutingModule } from './detallepedido-routing.module';
import { DetallepedidoPage } from './detallepedido.page';
import { ServiciosService } from '../service/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    DetallepedidoPageRoutingModule
  ],
  declarations: [DetallepedidoPage],
  providers:[ServiciosService,SocialSharing]
})
export class DetallepedidoPageModule {}
