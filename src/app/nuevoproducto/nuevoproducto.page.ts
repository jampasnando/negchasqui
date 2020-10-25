import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from '../service/servicios.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { urlimg } from '../global';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.page.html',
  styleUrls: ['./nuevoproducto.page.scss'],
})
export class NuevoproductoPage implements OnInit {
  @Input() idneg;
  @Input() maxpri;
  @Input() maxext;
  maximo=0;
  formulario:FormGroup;
  public uploader: FileUploader = new FileUploader({});
  nuevaimg="sinfoto.jpg";
  urlimg=urlimg;
  constructor(private modalCtrl:ModalController,private consultas:ServiciosService,private alertCtrl:AlertController) { }

  ngOnInit() {
    this.formulario=new FormGroup({
      nombre:new FormControl(null,Validators.compose([Validators.required])),
      descripcion:new FormControl(''),
      tipo:new FormControl("Principal",Validators.compose([Validators.required])),
      precio:new FormControl("",Validators.required),
      tiempo:new FormControl(null,Validators.required)
      
    });
  }
  cierranuevo(){
    this.modalCtrl.dismiss();
  }
  envianuevoprod(){
    this.avisoregnuevo();
    if(this.formulario.controls.tipo.value=="Principal"){this.maximo=this.maxpri;}
    else {this.maximo=this.maxext;}
    this.consultas.envianuevoprod(this.idneg,this.formulario,this.maximo,this.nuevaimg).subscribe((datos:any)=>{
      this.alertCtrl.dismiss();
      this.modalCtrl.dismiss("guardado");
    });
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
