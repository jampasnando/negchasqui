import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReordenaproductoPage } from './reordenaproducto.page';

const routes: Routes = [
  {
    path: '',
    component: ReordenaproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReordenaproductoPageRoutingModule {}
