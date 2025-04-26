import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

// Clase 'AuthService', que gestiona la autenticación
export class AuthService {
  // Usamos 'inject' para obtener una instancia del servicio HttpClient
  private http: HttpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:3600'; // URL base del backend

  // Método que maneja el registro de un usuario
  register(userForm: any) {
    // Realiza una solicitud HTTP POST al backend para registrar al usuario
    // Envía los datos del formulario 'userForm' al endpoint '/register' del servidor
    // OJO!!! PDTE REVISAR RUTA Y Nº PUERTO
    return this.http.post("http://localhost:3600/users/register", userForm)
    
  }

  // Método enviar datos al backend para login
  login(userLoginForm: any) {
      // Realiza una solicitud HTTP POST al backend para logear al usuario
    // Envía los datos del formulario 'userLoginForm' al endpoint '/login' del servidor
    // OJO!!! PDTE REVISAR RUTA Y Nº PUERTO    
    return this.http.post("http://localhost:3600/users/login", userLoginForm)
  }

  

}
