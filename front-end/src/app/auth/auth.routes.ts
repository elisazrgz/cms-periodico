import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const AUTH_ROUTES: Routes = [
    
            {
                path: 'register', // Ruta para acceder a registro
                component: RegisterComponent 
            },
            {
                path: 'login', // Ruta para acceder a los detalles de un evento específico
                //canActivate: [authGuard], // El guardia 'authGuard' protege esta ruta
                component: LoginComponent
            },
        ]
  
