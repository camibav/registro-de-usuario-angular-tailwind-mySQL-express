import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConectarService {
private url = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  obtenerUsuarios():Observable<any[]>{
    return this.http.get<any[]>(this.url+'/usuarios').pipe(
      catchError(err => {
        console.log(err);
        return [];
      })
    );
  }
  registrarUsuario(nombre: string, apellido: string, correo: string, password: string): Observable<any> {
    const requestData = { nombre, apellido, correo, password};
    return this.http.post<any>(this.url + '/registrar', requestData).pipe(
      catchError(err => {
         console.log(err);
          throw err;
      })
    );
  }
  loginUsuario(correo: string, password: string): Observable<any> {
    const requestData={correo, password};
    return this.http.post<any>(this.url + '/login', requestData).pipe(
      catchError(err => {
          console.log(err);
            throw err;
      })
    )
  }

}
