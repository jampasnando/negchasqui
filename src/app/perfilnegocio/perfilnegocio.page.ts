import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { GLOBAL } from '../global';
import { ServiciosService } from '../service/servicios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { MapaPage } from '../mapa/mapa.page';
import { urlimg } from '../global';

@Component({
  selector: 'app-perfilnegocio',
  templateUrl: './perfilnegocio.page.html',
  styleUrls: ['./perfilnegocio.page.scss'],
})
export class PerfilnegocioPage implements OnInit {
  idneg="";
  formulario:FormGroup;
  nuevaimg="";
  public uploader: FileUploader = new FileUploader({});
  urlimg=urlimg;
  bandera="foto";
  constructor(private menu:MenuController,private consultas:ServiciosService,private alertCtrl:AlertController,private toastCtrl:ToastController,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.formulario=new FormGroup({
      nombre:new FormControl(null,Validators.required),
      direccion:new FormControl(null,Validators.required),
      celular:new FormControl(null,Validators.required),
      telf:new FormControl(null),
      temporizador:new FormControl(null,Validators.min(10)),
      textosobrefoto:new FormControl(null,Validators.required),
      textocosto:new FormControl(null),
      mostrartarifa:new FormControl(false,Validators.required),
      horaini:new FormControl(''),
      horafin:new FormControl(''),
      estado:new FormControl(false,Validators.required)
    });
    this.menu.close();
    this.idneg=GLOBAL.id;
    console.log("idneg: ",this.idneg);
    this.consultas.obtieneperfilneg(this.idneg).subscribe((datos:any)=>{
      console.log("perfilneg: ",datos);
      this.formulario.setValue({
        nombre:datos.nombre,
        direccion:datos.direccion,
        celular:datos.celular,
        telf:datos.telf,
        temporizador:datos.temporizador,
        textosobrefoto:datos.textosobrefoto,
        textocosto:datos.textocosto,
        mostrartarifa:false,
        horaini:datos.horaini,
        horafin:datos.horafin,
        estado:false
      });
      if(datos.mostrartarifa=="si"){
        this.formulario.controls.mostrartarifa.setValue(true);
      }
      else{
        this.formulario.controls.mostrartarifa.setValue(false);
      }
      if(datos.estado=="activo"){
        this.formulario.controls.estado.setValue(true);
      }
      else{
        this.formulario.controls.estado.setValue(false);
      }
      let aux=datos.foto.split(".");
      if(aux[1]=="mp4"){
        this.bandera="video";
      }
      this.nuevaimg=datos.foto;
      console.log(datos);
    });
  }
 

  getFiles(): FileLikeObject[] {
    console.log("elobjuploader: ",this.uploader);
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  subir(ev){
    this.avisoimg();
    let files = this.getFiles();
    console.log(files);
    let ult=files.length;
    let unfile=files[ult-1];
    this.consultas.subir(unfile,"neg").subscribe((datos:any)=>{
      console.log("desdeserver: ",datos);
      let aux=datos.split(".");
      if(aux[1]=="mp4"){
        this.bandera="video";
      }
      else{
        this.bandera="foto";
      }
      this.nuevaimg=datos;
      this.alertCtrl.dismiss();
    });
  }
  async avisoimg(){
    const alertaimg=await this.alertCtrl.create({
      header:"Cargando imagen...",
      backdropDismiss:false
    });
    await alertaimg.present();
  }
  async guardacambios(){
    const alerta2=await this.alertCtrl.create({
      header:"Está seguro de guardar los cambios en este perfil ?",
      buttons:[
        {
          text:"No",
          role:"cancel"
        },
        {
          text:"Si",
          handler:()=>{
            this.alertCtrl.dismiss();
            this.enviaperfilneg();
          }
        }
      ]
    });
    await alerta2.present();
  }
  enviaperfilneg(){
    this.avisoguarda();
    // if(this.formulario.value.mostrartarifa){this.formulario.controls.mostrartarifa.setValue("si");}
    // else {this.formulario.controls.mostrartarifa.setValue("no");}
    console.log("formuenviando: ",this.formulario);
    this.consultas.guardaperfilneg(this.idneg,this.formulario,this.nuevaimg).subscribe((datos:any)=>{
      this.alertCtrl.dismiss();
      this.avisoexito();
    });
    console.log(this.formulario);
  }
  async avisoguarda(){
    const alerta1=await this.alertCtrl.create({
      header:"Guardando...",
      backdropDismiss:false
    });
    await alerta1.present();
  }
  async avisoexito(){
    const toast=await this.toastCtrl.create({
      message:"Guardado exitosamente",
      duration:1500,
      position:"middle"
    });
    await toast.present();
  }
  async abremapa(){
    const modalmap=await this.modalCtrl.create({
      component:MapaPage
    });
    await modalmap.present();
  }
}
