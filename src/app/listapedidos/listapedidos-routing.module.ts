import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListapedidosPage } from './listapedidos.page';

const routes: Routes = [
  {
    path: '',
    component: ListapedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListapedidosPageRoutingModule {}
