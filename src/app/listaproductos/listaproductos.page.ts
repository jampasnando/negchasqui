import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../global';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { ServiciosService } from '../service/servicios.service';
import { NuevoproductoPage } from '../nuevoproducto/nuevoproducto.page';
import { EditaproductoPage } from '../editaproducto/editaproducto.page';
import { urlimg } from '../global';
@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.page.html',
  styleUrls: ['./listaproductos.page.scss'],
})
export class ListaproductosPage implements OnInit {
  idneg="";
  listaprods:any=[];
  lista:any;
  extras:any;
  pedidos=[];
  ordenmaxprincipal=0;
  ordenmaxextra=0;
  urlimg=urlimg;
  constructor(private menu:MenuController,private consultas:ServiciosService,private modalCtrl:ModalController,private toast:ToastController) { }

  ngOnInit() {
    console.log("miglobal: ",GLOBAL);
    this.idneg=GLOBAL.id;
    
    this.menu.close();
    this.obtieneproductos();
  }
  obtieneproductos(){
    this.lista=[];
    this.extras=[];
    this.consultas.obtieneProductos(this.idneg).subscribe((resp:any)=>{
      console.log("listaprods",resp);
      this.listaprods=resp;
      for(let uno of this.listaprods){
        if(uno.tipo=="Principal"){
          this.lista.push(uno);
          if(parseInt(uno.orden)>this.ordenmaxprincipal){this.ordenmaxprincipal=parseInt(uno.orden);}
        }
        if(uno.tipo=="Extra"){
          this.extras.push(uno);
          if(parseInt(uno.orden)>this.ordenmaxextra){this.ordenmaxextra=parseInt(uno.orden);}
        }
        if(uno.estado=="activo"){
          uno.bandera=true;
        }
        else{
          uno.bandera=false;
        }
      }
    });
  }
  async abreformnuevoprod(){
    const modal=await this.modalCtrl.create({
      component:NuevoproductoPage,
      componentProps:{
        idneg:this.idneg,
        maxpri:this.ordenmaxprincipal,
        maxext:this.ordenmaxextra
      }
    });
    modal.onDidDismiss().then((datos)=>{
      if(datos.data=="guardado"){this.obtieneproductos();}
    });
    await modal.present();
  }

  async editaproducto(unprod){
    const modalprod=await this.modalCtrl.create({
      component:EditaproductoPage,
      componentProps:{
        unprod:unprod
      }
    });
    await modalprod.present();
    modalprod.onDidDismiss().then(dato=>{
      if(dato.data=="si"){
        this.obtieneproductos();
      }
    });
  }
  cambiaestado(idprod,ev){
    ev.stopPropagation();
    this.avisocambio();
    var nuevoestado="";
    if(ev.detail.checked){
      nuevoestado="activo";
    }
    else{
      nuevoestado="inactivo";
    }
    this.consultas.cambiaestadoprod(idprod,nuevoestado).subscribe((datos:any)=>{
      if(datos=="cambiado"){
        this.toast.dismiss();
        this.avisocambiado("Estado CAMBIADO con éxito");
      }
      else{
        this.avisocambiado("NO se pudo cambiar estado");
        this.obtieneproductos();
      }
    });
    console.log("estado: ",ev.detail.checked);
    console.log("idprod",idprod);
  }
  async avisocambio(){
    const avisocambio=await this.toast.create({
      header:"Cambiando estado...",
      position:"middle"
    });
    await avisocambio.present();
  }
  async avisocambiado(msg){
    const cambiado=await this.toast.create({
      header:msg,
      duration:1200,
      position:"middle"
    });
    await cambiado.present();
  }
}
