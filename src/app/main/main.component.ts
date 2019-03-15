import { Component, OnInit } from '@angular/core';
import { UsuarioClass } from './modelo/UsuarioClass';
import { ServicioRestService } from '../servicio-rest.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public listaUsuarios: Array<UsuarioClass>;
  public claseAnimada: string = '';
  public datosFormulario: UsuarioClass;
  //se cambia en funciona a la tipo de peticion
  public tipoPeticion:string='insertar';
  

 

  constructor(private servicio: ServicioRestService) { }

  ngOnInit() {
    this.getTodosUsuarios();
  }

  private getTodosUsuarios(): void {
    this.servicio.getTodosUsuarios().subscribe((data: UsuarioClass[]) => {
      this.listaUsuarios=data;
      console.log(this.listaUsuarios);
    }, (error) => {
      console.log(error)
    }, () => {
      console.log("terminamoos")
      this.tipoPeticion='insertar';
    })
  }
  public eliminarCard(id: number): void {
    this.servicio.eliminarUsuario(id).subscribe((data) => {
      console.log("eliminado con exito ", data)
    }, (error) => {
      console.log(error)
    }, () => {
      this.getTodosUsuarios();
    })
  }
  public modificarCard(usuario:UsuarioClass): void {

    this.aplicarEstiloAnimado();
    setTimeout(()=>{ this.datosFormulario=usuario;
      this.tipoPeticion='modificar';
    }, 500);
    
    console.log(this.tipoPeticion)

  }



  public aplicarEstiloAnimado(): void {
    if (this.claseAnimada == '') {
      this.claseAnimada = 'blink_me';
      setTimeout(()=>{ this.claseAnimada='' }, 1000);
    } 
    console.log(this.claseAnimada)
  }



}
