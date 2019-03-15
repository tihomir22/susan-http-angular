import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioClass } from '../main/modelo/UsuarioClass';
import { ServicioRestService } from '../servicio-rest.service';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  public nombre: string;
  public usuario: string;
  public email: string;
  private id:number;
  private usuarioActivo:UsuarioClass;
  private tipoPeticionStr:string='insertar';

  @Input('datosFormulario')
  set datosFormulario(usuario: UsuarioClass) {
    if (isDefined(usuario)) {
      this.nombre = usuario.name;
      this.usuario = usuario.username;
      this.email = usuario.email;
      this.id=usuario.id;
      this.usuarioActivo=usuario;
    }
  }
  @Input('tipoPeticion')
  set tipoPeticion(tipo:string) {
    console.log(tipo)
    if (isDefined(tipo)) {
      this.tipoPeticionStr=tipo; 
      console.log(this.tipoPeticionStr)
    }
  }

  

  @Output() actualizar = new EventEmitter<boolean>();

  constructor(private servicio: ServicioRestService) { }

  ngOnInit() {
  }
  crearNuevoUsuario(): void {
    let usuarioObj: UsuarioClass = new UsuarioClass(this.nombre, this.usuario, this.email)
    this.servicio.anyadirUsuario(usuarioObj).subscribe((usuario) => { console.log(usuario) },
      (error) => {
        console.log(error)
      },
      () => {
        this.actualizarLista();
      })
  }
  modificarUsuario():void{
    this.servicio.modificarUsuario(this.usuarioActivo).subscribe((respuesta:Response)=>{
      console.log(respuesta)
    },(error)=>{
      console.log(error)
    },()=>{
      this.actualizarLista()
      this.dejarFormEnBlanco();
    })
  }
  aplicarCambios():void{
    if(this.tipoPeticionStr=='modificar'){
      this.usuarioActivo.email=this.email
      this.usuarioActivo.name=this.nombre
      this.usuarioActivo.username=this.usuario
    }
  }
  dejarFormEnBlanco():void{
    this.email='';
    this.nombre='';
    this.usuario='';
    this.tipoPeticionStr='insertar';
  }
  
  actualizarLista(): void {
    this.actualizar.emit(true)
  }

}
