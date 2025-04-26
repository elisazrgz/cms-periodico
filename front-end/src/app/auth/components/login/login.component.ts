import { Component, inject } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../service/auth.service'; 
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService : AuthService = inject(AuthService)
  private router: Router = inject(Router);
  
  public userLoginForm = {
    username: '', 
    password: '' 
  }
  
  handleLoginForm() {

    const userFormValues = Object.values(this.userLoginForm)

    if(userFormValues.includes('')) {
      alert('Todos los campos son obligatorios') // Muestra un mensaje de error si algun campo esta vacio
      return
    }

  this.authService.login(this.userLoginForm).subscribe({
    next: (data: any) =>{
      localStorage.setItem(`token`, data.token)
      localStorage.setItem('role', data.data.role);
      localStorage.setItem('username', data.data.username);
      localStorage.setItem('_id', data.data._id); 

      alert('Login exitoso');
      const userRole = data.data.role;
      if (userRole === 'editor') {
        this.router.navigate(['/editor']);
      } else if (userRole === 'writer') {
        this.router.navigate(['/writer/draft-list']);
      } else {
        this.router.navigate(['']);
      }
    },
    error: (error) =>{
      alert('Error al iniciar sesión')
      console.log(error)
    }
  })
    
  }
 

}
