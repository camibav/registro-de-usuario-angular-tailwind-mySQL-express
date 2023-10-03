import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConectarService {
private url = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  obtenerUsuario(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/usuario/${userId}`).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
      , map(response => {
        const userId = response.id;
        return userId;
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
    const requestData = { correo, password };
    return this.http.post<any>(this.url + '/login', requestData).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      }),
      map(response => {
        const userId = response.userId; // Obtén el ID del usuario de la respuesta
        return { ...response, userId }; // Devuelve la respuesta original con el ID del usuario agregado
      })
    );
  }

  registrarDatosDePerfil(usuarioId: number, edad: number, telefono: string, foto: File): Observable<any> {
    const formData = new FormData();
    formData.append('userId', usuarioId.toString());
    formData.append('edad', edad.toString());
    formData.append('telefono', telefono);
    formData.append('foto', foto);
console.log('funciona')

    return this.http.post<any>(`${this.url}/datos`, formData).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
    );
  }

}
