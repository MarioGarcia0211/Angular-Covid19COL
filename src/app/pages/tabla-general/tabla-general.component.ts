import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-tabla-general',
  templateUrl: './tabla-general.component.html',
  styleUrls: ['./tabla-general.component.scss']
})
export class TablaGeneralComponent implements OnInit, AfterViewChecked {

  listPacientes: Paciente[] = [];
  totalPacientes: Paciente[] = [];
  limit = 10;
  offset = 0;
  inicio = 1
  final = 10;
  datos = 100000;

  total = 10
  visibleAtras = false;
  loading = true;

  constructor(public cs: ConexionService) { }

  ngOnInit(): void {
    this.all('?$limit='+this.datos+'&$offset=0');
  }

  ngAfterViewChecked(): void {
    //$('[data-toggle="tooltip"]').tooltip();
  }

  all(opcion: string){
    this.cs.mostrarPacientes(opcion).subscribe((total: Paciente[]) =>{
      this.totalPacientes = [...total];
      console.log(this.totalPacientes);
      this.mostrarDatos('?$limit='+this.limit+'&$offset='+this.offset);
      this.loading = false;
    });
  }

  mostrarDatos(opcion: string){
    this.cs.mostrarPacientes(opcion).subscribe((paciApi: Paciente[]) =>{
      this.listPacientes = [...paciApi];
    });
  }

  siguiente(){
    this.offset= this.offset+10;
    this.mostrarDatos('?$limit='+this.limit+'&$offset='+this.offset);
    this.visibleAtras=true;
    this.inicio = this.inicio + 10;
    this.final = this.final + 10
  }

  atras(){
    if (this.offset == 0){
      this.visibleAtras=false;
    }else{
      this.visibleAtras=true;
      this.offset= this.offset-10;
      this.mostrarDatos('?$limit='+this.limit+'&$offset='+this.offset);
      this.inicio = this.inicio - 10;
      this.final = this.final - 10;
    }
  }

}
