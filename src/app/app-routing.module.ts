import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full'
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'listapedidos',
    loadChildren: () => import('./listapedidos/listapedidos.module').then( m => m.ListapedidosPageModule)
  },
  {
    path: 'detallepedido',
    loadChildren: () => import('./detallepedido/detallepedido.module').then( m => m.DetallepedidoPageModule)
  },
  {
    path: 'listapedidosayer',
    loadChildren: () => import('./listapedidosayer/listapedidosayer.module').then( m => m.ListapedidosayerPageModule)
  },
  {
    path: 'listapedidoshist',
    loadChildren: () => import('./listapedidoshist/listapedidoshist.module').then( m => m.ListapedidoshistPageModule)
  },
  {
    path: 'listaproductos',
    loadChildren: () => import('./listaproductos/listaproductos.module').then( m => m.ListaproductosPageModule)
  },
  {
    path: 'nuevoproducto',
    loadChildren: () => import('./nuevoproducto/nuevoproducto.module').then( m => m.NuevoproductoPageModule)
  },
  {
    path: 'reordenaproducto',
    loadChildren: () => import('./reordenaproducto/reordenaproducto.module').then( m => m.ReordenaproductoPageModule)
  },
  {
    path: 'perfilnegocio',
    loadChildren: () => import('./perfilnegocio/perfilnegocio.module').then( m => m.PerfilnegocioPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
