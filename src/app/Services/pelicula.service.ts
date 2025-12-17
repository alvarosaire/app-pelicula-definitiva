import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/config';
import { Observable } from 'rxjs';
import { Pelicula } from '../Interfaces/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  
  //private apiBaseUrl: string = "http://www.apipeliculas.somee.com/api/Pelicula/"

  private apiBaseUrl: string = `${environment.endPoint}Pelicula/`
  
  private http = inject(HttpClient);

  constructor() { }

  getList():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(`${this.apiBaseUrl}Lista`)
  }

  add(request: Pelicula):Observable<Pelicula>{
    return this.http.post<Pelicula>(`${this.apiBaseUrl}Agregar`,request)
  }

  delete(idPelicula: number):Observable<void>{
    return this.http.delete<void>(`${this.apiBaseUrl}Eliminar/${idPelicula}`);
  }
}

