import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../global';
import { AlertController, ModalController } from '@ionic/angular';
import { ServiciosService } from '../service/servicios.service';
declare var google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map=null;
  lat=-17.38;
  lng=-66.14;
  zoom=15;
  constructor(private alertCtrl:AlertController,private consultas:ServiciosService,private modalCtrl:ModalController) { }

  ngOnInit() {
   
    this.consultas.obtieneconfiguracion().subscribe((datos:any)=>{
      if(datos.lat!=""){
        this.lat=parseFloat(datos.lat);
        this.lng=parseFloat(datos.lng);
        this.zoom=parseInt(datos.zoom);
      }
      this.cargamapa();
    });
    console.log("entra ngOnInit");
  }
  ionViewDidEnter(){
    console.log("entra onViewDidEnter");
    this.cargamapa();
  }
  cargamapa(){
    
    if(GLOBAL.lat!=""){
      this.lat=parseFloat(GLOBAL.lat);
      this.lng=parseFloat(GLOBAL.lng);
      this.zoom=parseInt(GLOBAL.zoom);
    }
    var mapEle:HTMLElement=document.getElementById("map");
    var mylatlng={lat:this.lat,lng:this.lng};
    this.map=new google.maps.Map(mapEle,{
      center:mylatlng,
      zoom:this.zoom
    });
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      console.log("entra idle ");
      let marker=new google.maps.Marker({
        position:mylatlng,
        map:this.map,
        title:'micentro'
      });
      google.maps.event.addListener(this.map,"center_changed",()=>{
        console.log("cambiocentro");
        console.log("centro: ",this.map.getCenter());
        
        marker.setPosition(this.map.getCenter());
        this.lat=this.map.getCenter().lat();
        this.lng=this.map.getCenter().lng();
        this.zoom=this.map.getZoom();
      });
    });
  }
  async guardacoord(){
    const aviso=await this.alertCtrl.create({
      header:"Guardar esta ubicación para tu negocio?",
      buttons:[
        {
          text:"No",
          role:"cancel"
        },
        {
          text:"Si",
          handler:()=>{
            this.avisoguardando();
            this.consultas.actualizacoord(GLOBAL.id,this.lat,this.lng,this.zoom).subscribe((datos:any)=>{
              this.alertCtrl.dismiss();
              GLOBAL.lat=this.lat+'';
              GLOBAL.lng=this.lng+'';
              GLOBAL.zoom=this.zoom+'';
              this.alertCtrl.dismiss();
              this.map=null;
              this.modalCtrl.dismiss();
            });
          }
        }
      ]
    });
    await aviso.present();
  }
  async avisoguardando(){
    const avisoguarda=await this.alertCtrl.create({
      header:"Guardando...",
      backdropDismiss:false
    });
    await avisoguarda.present();
  }
  cierramapa(){
    this.modalCtrl.dismiss();
  }
}
