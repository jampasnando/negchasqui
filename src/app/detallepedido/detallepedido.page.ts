import { Component, OnInit, Input } from '@angular/core';
import { ServiciosService } from '../service/servicios.service';
import { ModalController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-detallepedido',
  templateUrl: './detallepedido.page.html',
  styleUrls: ['./detallepedido.page.scss'],
})
export class DetallepedidoPage implements OnInit {
  @Input() unpedido;
  detalleunpedido:any=[];
  total=0;
  horareg="";
  micolor="";
  identificador:any;
  mensaje="";
  token="";
  constructor(private consultas:ServiciosService,private modalCtrl:ModalController,private alertCtrl:AlertController,private socialSharing:SocialSharing) { }

  ngOnInit() {
    this.token=this.unpedido.token;
    this.identificador=this.unpedido.identificador;
    this.micolor=this.unpedido.fondo;
    this.horareg=this.unpedido.fechareg.split(" ")[1].split(":").splice(0,2).join(":");
    this.consultas.obtieneunpedido(this.identificador).subscribe((datos:any)=>{
      console.log("unpedido: ",datos);
      this.detalleunpedido=datos;
      this.totalizador();
    });
  }
  cierraunpedido(){
    this.modalCtrl.dismiss("no");
  }
  totalizador(){
    for(let unp of this.detalleunpedido){
      this.total=this.total + parseInt(unp.cantidad)*parseInt(unp.preciou);
    }
 
  }
 
  async cambiaestado(nuevoestado,color){
    const alerta1=await this.alertCtrl.create({
      header:"Cambiar estado a "+nuevoestado+"?",
      buttons:[
        {
          text:"No",
          role:"cancel"
        },
        {
          text:"Aceptar",
          handler:()=>{
            this.enviacambioestado(nuevoestado,color);
          }
        }
      ]
    });
    await alerta1.present();
  }
  enviacambioestado(nuevoestado,color){
    this.abrealertaenvio();
    this.consultas.envianuevoestado(this.identificador,nuevoestado,color,this.token,this.detalleunpedido[0].nombrecli).subscribe((datos:any)=>{
      // if(nuevoestado=="proceso"){
        
      //   this.consultas.enviapush(this.token,this.detalleunpedido[0].nombrecli,nuevoestado).subscribe(resp=>{
      //     console.log("resppush: ",resp);
      //   });
      // }
      console.log("actualizado?: ",datos);
      this.alertCtrl.dismiss();
      let devuelto={
        nuevoestado:nuevoestado,
        color:color
      }
      this.modalCtrl.dismiss(devuelto);

    });
  }
  async abrealertaenvio(){
    const alerta2=await this.alertCtrl.create({
      header:"Cambiando estado...",
    });
    await alerta2.present();
  }
  async abreWhatsApp(nro) {
    this.mensaje="Gracias por su pedido, pronto lo recibirá en su dirección";
    console.log(this.mensaje);
    this.socialSharing.shareViaWhatsAppToReceiver('+591'+nro,this.mensaje,null).then(() => {
      console.log("enviado");
    }).catch((e) => {
      console.log("noenviado");
      // Error!
    });
  }
  reenviainfo(unpedido){
    this.mensaje="Cliente: "+unpedido.nombrecli+" Celu: "+unpedido.celular + " Dirección: "+unpedido.direccion;
    const link="https://www.google.com/maps/dir/?api=1&destination="+unpedido.lat+","+unpedido.lng+"&travelmode=driving";
    this.socialSharing.shareWithOptions({message:this.mensaje,url:link}).then(()=>{
      console.log("info: ",this.mensaje);
      console.log("compartido a whatsapp")
    });
  }
}
