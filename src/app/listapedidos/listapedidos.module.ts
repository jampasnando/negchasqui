import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListapedidosPageRoutingModule } from './listapedidos-routing.module';

import { ListapedidosPage } from './listapedidos.page';
import { ServiciosService } from '../service/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ListapedidosPageRoutingModule
  ],
  declarations: [ListapedidosPage],
  providers:[ServiciosService,SocialSharing,Insomnia,FCM]
})
export class ListapedidosPageModule {}
