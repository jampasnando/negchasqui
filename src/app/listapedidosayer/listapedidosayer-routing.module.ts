import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListapedidosayerPage } from './listapedidosayer.page';

const routes: Routes = [
  {
    path: '',
    component: ListapedidosayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListapedidosayerPageRoutingModule {}
