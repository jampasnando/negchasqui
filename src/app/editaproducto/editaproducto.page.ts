import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ServiciosService } from '../service/servicios.service';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { urlimg } from '../global';
@Component({
  selector: 'app-editaproducto',
  templateUrl: './editaproducto.page.html',
  styleUrls: ['./editaproducto.page.scss'],
})
export class EditaproductoPage implements OnInit {
  @Input() unprod;
  idprod="";
  nuevaimg="";
  formulario:FormGroup;
  url=urlimg;
  public uploader: FileUploader = new FileUploader({});
  constructor(private modalCtrl:ModalController,private consultas:ServiciosService,private alertCtrl:AlertController,private toast:ToastController) { }

  ngOnInit() {
    console.log("url: ",this.url);
    this.formulario=new FormGroup({
      nombre:new FormControl(null,Validators.compose([Validators.required])),
      descripcion:new FormControl(''),
      tipo:new FormControl("Principal",Validators.compose([Validators.required])),
      precio:new FormControl("",Validators.required),
      tiempo:new FormControl(null,Validators.required)
      
    });
    this.formulario.setValue({
      nombre:this.unprod.nombre,
      descripcion:this.unprod.descripcion,
      tipo:this.unprod.tipo,
      precio:this.unprod.costo,
      tiempo:this.unprod.tiempo
    });
    this.idprod=this.unprod.id;
    this.nuevaimg=this.unprod.foto;
  }
  cierraeditar(msg){
    this.modalCtrl.dismiss();
  }
  async enviacambios(){
    const aviso1=await this.alertCtrl.create({
      header:"Está seguro de guardar los cambios?",
      buttons:[
        {
          text:"No",
          role: "cancel"
        },
        {
          text:"Si",
          handler:()=>{
            console.log("idprod: ",this.idprod);
            this.avisoguardando();
            this.consultas.actualizaprod(this.idprod,this.formulario,this.nuevaimg).subscribe((datos:any)=>{
              // console.log("desde server: ",datos);
              if(datos=="actualizado"){
                this.toast.dismiss();
                this.avisoguardado("GUARDADO CON ÉXITO");
                this.modalCtrl.dismiss("si");
              }
              else{
                this.toast.dismiss();
                this.avisoguardado("NO se pudo guardar, revise su internet");
              }
            });
          }
        }
      ]
    });
    await aviso1.present();
    
  }
  async avisoguardando(){
    const aviso2=await this.toast.create({
      header:"Guardando...",
      position:"middle"
    });
    await aviso2.present();
  }
  async avisoguardado(msg){
    const aviso3=await this.toast.create({
      header:msg,
      position:"middle",
      duration:1000
    });
    await aviso3.present();
  }
  async avisoregnuevo(){
    const alerta=await this.alertCtrl.create({
      header:"Guardando",
      backdropDismiss:false
    });
    await alerta.present();
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
    this.consultas.subir(unfile,"prod").subscribe((datos:any)=>{
      console.log("desdeserver: ",datos);
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
}
