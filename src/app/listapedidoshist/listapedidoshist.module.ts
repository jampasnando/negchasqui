import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListapedidoshistPageRoutingModule } from './listapedidoshist-routing.module';

import { ListapedidoshistPage } from './listapedidoshist.page';
import { HttpClientModule } from '@angular/common/http';
import { ServiciosService } from '../service/servicios.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ListapedidoshistPageRoutingModule
  ],
  declarations: [ListapedidoshistPage],
  providers:[ServiciosService,SocialSharing]
})
export class ListapedidoshistPageModule {}
