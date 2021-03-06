import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../global';
import { ServiciosService } from '../service/servicios.service';
import { ModalController, MenuController, ToastController } from '@ionic/angular';
import { DetallepedidoPage } from '../detallepedido/detallepedido.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';

@Component({
  selector: 'app-listapedidos',
  templateUrl: './listapedidos.page.html',
  styleUrls: ['./listapedidos.page.scss'],
})
export class ListapedidosPage implements OnInit {
  idneg="";
  nombreneg="";
  listapedidos:any;
  audio:any;
  audiox:any;
  nroregs=0;
  evx:Event;
  temporizador=45;
  nrop=0;
  nrod=0;
  nron=0;
  nroe=0;
  interv:any;
  hora="";
  constructor(private menu:MenuController,private consultas:ServiciosService,private modalCtrl:ModalController,private insomnia:Insomnia,private toast:ToastController) { }

  ngOnInit() {
    this.insomnia.keepAwake().then(
    () => console.log('nodormirá'),
    () => console.log('error')
  );
    console.log("entra ngOnInit de Listapedidos");
    this.menu.close();
    console.log("global: ",GLOBAL);
    this.idneg=GLOBAL.id;
    this.nombreneg=GLOBAL.nombre;
    if(parseInt(GLOBAL.temporizador)>=10){this.temporizador=parseInt(GLOBAL.temporizador);}
    
    this.consultas.listapedidos(this.idneg).subscribe((datos:any)=>{
      this.nroregs=datos.length;
      console.log("listapedidos1: ",datos);
      this.listapedidos=datos;
      this.ponefechahora();
      this.contadores();
      const ahora=new Date();
      this.hora=ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds();
    });
    FCM.getToken().then(token => {
      console.log("token",token);
      this.consultas.enviatoken(token,this.idneg).subscribe(datos=>{
        console.log("tokenhacia BD: ",datos);
      })
     });
     FCM.onNotification().subscribe(data=>{
      console.log("entra a onNotification al Ingresar");
      this.alertallegada();
      this.audiox.play();
      this.refrescalista(this.evx,"no");
      // this.llegopedido();
      console.log("data de notif Ingreso: ",data);
      
      if(data.wasTapped){
        console.log("notif tocada");
        // this.llegopedido();
      }
    });
    FCM.getInitialPushPayload().then(data=>{
      console.log("payload en ingreso: ",data);
    });
    this.audiox = new Audio();
        this.audiox.src = '../../assets/campana.mp3';
        this.audiox.load();
       
    this.automatico();

  }
  async alertallegada(){
    const llega=await this.toast.create({
      header:"Nuevo Pedido!",
      message:"De un cliente",
      duration:2000,
      position:"middle"
    });
    await llega.present();
  }
  onViewdidEnter(){
    this.menu.close();
    
  }
  automatico() { 
    console.log("automatico");
    clearInterval(this.interv);
    this.interv=setInterval(()=>{this.refrescalista(this.evx,"no")},this.temporizador*1000);
   }
  ponefechahora(){
    for(let unito of this.listapedidos){
      unito.hora=unito.fechareg.split(" ")[1].split(":").splice(0,2).join(":");
      unito.fecha=unito.fechareg.split(" ")[0];
    }
  }
  refrescalista(event,ban="si"){
    this.consultas.listapedidos(this.idneg).subscribe((datos:any)=>{
      console.log("listapedidos2: ",datos);
      this.listapedidos=datos;
      if(ban=="si"){event.target.complete();}
      
      this.ponefechahora();
      if(this.listapedidos.length>this.nroregs){
        this.nroregs=this.listapedidos.length;
        this.audio = new Audio();
        this.audio.src = '../../assets/nuevopedido.mp3';
        this.audio.load();
        this.audio.play();
        // this.audio.loop=false;
      }
      this.contadores();
      const ahora=new Date();
      this.hora=ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds();
    });
  }
  contadores(){
    this.nrop=0;
    this.nrod=0;
    this.nron=0;
    this.nroe=0;
    for(let unox of this.listapedidos){
      if(unox.color==""){this.nron++;}
        else if(unox.color=="gold"){this.nrop++;}
              else if(unox.color=="lightskyblue"){this.nrod++;}
                    else{this.nroe++;}
    }
  }
  async abrepedido(unpedido){
    const modal=await this.modalCtrl.create({
      component:DetallepedidoPage,
      componentProps:{
        unpedido:unpedido
      },
      backdropDismiss:false
    });
    modal.onDidDismiss().then((datos)=>{
      console.log("ondismisss: ",datos);
      if(datos.data!="no"){unpedido.color=datos.data.color;this.contadores();}
    });
    await modal.present();
  }
}
