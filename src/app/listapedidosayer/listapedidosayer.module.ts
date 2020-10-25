import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListapedidosayerPageRoutingModule } from './listapedidosayer-routing.module';

import { ListapedidosayerPage } from './listapedidosayer.page';
import { HttpClientModule } from '@angular/common/http';
import { ServiciosService } from '../service/servicios.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ListapedidosayerPageRoutingModule
  ],
  declarations: [ListapedidosayerPage],
  providers:[ServiciosService,SocialSharing]
})
export class ListapedidosayerPageModule {}
