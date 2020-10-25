import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../global';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { ServiciosService } from '../service/servicios.service';

@Component({
  selector: 'app-reordenaproducto',
  templateUrl: './reordenaproducto.page.html',
  styleUrls: ['./reordenaproducto.page.scss'],
})
export class ReordenaproductoPage implements OnInit {
  idneg="";
  listaprods:any=[];
  lista:any;
  extras:any;
  ordenmaxprincipal=0;
  ordenmaxextra=0
  constructor(private menu:MenuController,private consultas:ServiciosService,private modalCtrl:ModalController,private alertCtrl:AlertController) { }

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
      }
      console.log("principalinicio: ",this.lista);
      console.log("extrasinicio: ",this.extras);
    });
  }
  async avisoelim(idprod){
    const aviso1=await this.alertCtrl.create({
      header:"Está seguro de ELIMINAR este producto ?",
      buttons:[
        {
          text:"No",
          role:"cancel"
        },
        {
          text:"Sí",
          handler:()=>{
            this.eliminaprod(idprod)
          }
        }
      ]
    });
    await aviso1.present();
  }
  async avisoeliminando(){
    const aviso2=await this.alertCtrl.create({
      header:"Eliminando...",
      backdropDismiss:false
    });
    await aviso2.present();
  }
  eliminaprod(idprod){
    this.avisoeliminando();
    this.consultas.eliminaprod(idprod).subscribe((datos:any)=>{
      this.alertCtrl.dismiss();
      this.obtieneproductos();
    });
  }
  mueveprincipal(ev){
    console.log(ev);
    let unprodx=this.lista.splice(ev.detail.from,1)[0];
    this.lista.splice(ev.detail.to,0,unprodx);
    ev.detail.complete();
    console.log("listarreordenada: ",this.lista);
  }
  mueveextra(ev){
    console.log(ev);
    let unprodx=this.extras.splice(ev.detail.from,1)[0];
    this.extras.splice(ev.detail.to,0,unprodx);
    ev.detail.complete();
  }
  guardaprincipal(){
    let listax=[];
    for(let aux of this.lista){
      listax.push(aux.id);
    }
    this.avisoreordenar(listax,"Principal");
    console.log("listax:",listax);
  }
  guardaextra(){
    let listax=[];
    for(let aux of this.extras){
      listax.push(aux.id);
    }
    this.avisoreordenar(listax,"Extra");
  }
  async avisoreordenar(listax,tipo){
    const aviso3=await this.alertCtrl.create({
      header:"Esta seguro de guardar el nuevo orden ?",
      buttons:[
        {
          text:"No",
          role:"cancel"
        },
        {
          text:"Si",
          handler:()=>{
            this.reordenar(listax,tipo);
          }
        }
      ]
    });
    await aviso3.present();
  }
  reordenar(listax,tipo){

    this.alertCtrl.dismiss();
    this.reordenando();
    this.consultas.reordenaprods(listax,tipo).subscribe((datos:any)=>{
      this.alertCtrl.dismiss();
      this.obtieneproductos();
    });
  }
  async reordenando(){
    const aviso4=await this.alertCtrl.create({
      header:"Reordenando...",
      backdropDismiss:false
    });
    await aviso4.present();
  }
}
