import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../service/servicios.service';
import { Router } from '@angular/router';
import { GLOBAL } from '../global';
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  login="";
  password="";
  constructor(private consultas:ServiciosService,private router:Router) { }

  ngOnInit() {
  }
  ingresar(){
    if((this.login!="")&&(this.password!="")){
      this.consultas.ingreso(this.login,this.password).subscribe((datos:any)=>{
        console.log("datos: ",datos);
        if(datos.length>0){
          GLOBAL.id=datos[0].id;
          GLOBAL.nombre=datos[0].nombre;
          GLOBAL.telf=datos[0].celular;
          GLOBAL.temporizador=datos[0].temporizador;
          GLOBAL.textosobrefoto=datos[0].textosobrefoto;
          GLOBAL.lat=datos[0].lat;
          GLOBAL.lng=datos[0].lng;
          GLOBAL.zoom=datos[0].zoom;
          console.log("globalinicial: ",GLOBAL);
          this.router.navigate(['/listapedidos']);
        }
      });
    }
  }

}
