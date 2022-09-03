import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  // mostrar(): Observable<Paciente[]>{
  //   return this.http.get<Paciente[]>(this.apiUrl);
  // }

  mostrarPacientes(opcion: string): Observable<Paciente[]>{
    const url = this.apiUrl + opcion;
    return this.http.get<Paciente[]>(url);
  }
}
