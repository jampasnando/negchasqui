import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlserver } from '../global';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  // url="http://sistembo.com/delivery/consultasnegocio.php";
  url=urlserver;
  constructor(private httpClient:HttpClient) { }
  ingreso(login,pass){
    const params:FormData=new FormData();
    params.append("consulta","ingreso");
    params.append("login",login);
    params.append("pass",pass);
    return this.httpClient.post<any>(this.url,params);
  }
  listapedidos(idneg){
    const params:FormData=new FormData();
    params.append("consulta","listapedidos");
    params.append("idneg",idneg);
    return this.httpClient.post<any>(this.url,params);
  }
  listapedidosayer(idneg){
    const params:FormData=new FormData();
    params.append("consulta","listapedidosayer");
    params.append("idneg",idneg);
    return this.httpClient.post<any>(this.url,params);
  }
  listapedidoshist(idneg){
    const params:FormData=new FormData();
    params.append("consulta","listapedidoshist");
    params.append("idneg",idneg);
    return this.httpClient.post<any>(this.url,params);
  }
  obtieneunpedido(idpedido){
    const params:FormData=new FormData();
    params.append("consulta","unpedido");
    params.append("idpedido",idpedido);
    return this.httpClient.post<any>(this.url,params);
  }
  envianuevoestado(identificador,nuevoestado,color,token,nombrecli){
    const params:FormData=new FormData();
    params.append("consulta","actualizaestado");
    params.append("identificador",identificador);
    params.append("nuevoestado",nuevoestado);
    params.append("color",color);
    params.append("token",token);
    params.append("nombrecli",nombrecli);
    return this.httpClient.post<any>(this.url,params);
  }
  obtieneProductos(idneg){
    const params:FormData=new FormData();
    params.append("consulta","obtieneprods");
    params.append("idneg",idneg);
    return this.httpClient.post<any>(this.url,params);
  }
  envianuevoprod(idneg,formu,maximo,nuevaimagen){
    const params:FormData=new FormData();
    params.append("consulta","nuevoprod");
    params.append("idneg",idneg);
    params.append("formulario",JSON.stringify(formu.value));
    params.append("maximo",maximo);
    params.append("nuevaimagen",nuevaimagen);
    return this.httpClient.post<any>(this.url,params);

  }
  actualizaprod(idprod,formu,nuevaimagen){
    const params:FormData=new FormData();
    params.append("consulta","actualizaprod");
    params.append("idprod",idprod);
    params.append("formulario",JSON.stringify(formu.value));
    params.append("nuevaimagen",nuevaimagen);
    return this.httpClient.post<any>(this.url,params);

  }
  eliminaprod(idprod){
    const params:FormData=new FormData();
    params.append("consulta","eliminaprod");
    params.append("idprod",idprod);
    return this.httpClient.post<any>(this.url,params);
  }
  reordenaprods(prods,tipo){
    let productos=JSON.stringify(prods);
    const params:FormData=new FormData();
    params.append("consulta","reordenaprods");
    params.append("productos",productos);
    params.append("tipo",tipo);
    return this.httpClient.post<any>(this.url,params);
  }
  subir(archivo,para){
    const params:FormData=new FormData();
    params.append("consulta","subeimagen");
    params.append("para",para);
    params.append("file",archivo.rawFile,archivo.name);
    return this.httpClient.post<any>(this.url,params);
  }
  obtieneperfilneg(idneg){
    const params:FormData=new FormData();
    params.append("consulta","obtieneperfilneg");
    params.append("idneg",idneg);
    return this.httpClient.post<any>(this.url,params);
  }
  guardaperfilneg(idneg,formu,imagen){
    const params:FormData=new FormData();
    params.append("consulta","guardaperfilneg");
    params.append("idneg",idneg);
    params.append("formulario",JSON.stringify(formu.value));
    params.append("imagen",imagen);
    return this.httpClient.post<any>(this.url,params);
  }
  actualizacoord(idneg,lat,lng,zoom){
    const params:FormData=new FormData();
    params.append("consulta","actualizacoord");
    params.append("idneg",idneg);
    params.append("lat",lat),
    params.append("lng",lng);
    params.append("zoom",zoom);
    return this.httpClient.post<any>(this.url,params);
  }
  obtieneconfiguracion(){
    const params:FormData=new FormData();
    params.append("consulta","obtieneconfiguracion");
    return this.httpClient.post<any>(this.url,params);
  }
  cambiaestadoprod(idprod, estado){
    const params:FormData=new FormData();
    params.append("consulta","cambiaestadoprod");
    params.append("idprod",idprod);
    params.append("estado",estado);
    return this.httpClient.post<any>(this.url,params);
  }
  // enviapush(token,cliente,nuevoestado){
  //   const params:FormData=new FormData();
  //   params.append("consulta","enviapush");
  //   params.append("token",token);
  //   params.append("cliente",cliente);
  //   return this.httpClient.post<any>(this.url,params);
  // }
  enviatoken(token,idneg){
    const params:FormData=new FormData();
    params.append("consulta","registratoken");
    params.append("token",token);
    params.append("idneg",idneg);
    return this.httpClient.post<any>(this.url,params);
  }
}
