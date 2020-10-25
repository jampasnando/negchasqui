import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListapedidoshistPage } from './listapedidoshist.page';

const routes: Routes = [
  {
    path: '',
    component: ListapedidoshistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListapedidoshistPageRoutingModule {}
