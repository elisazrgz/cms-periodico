import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private userFormData: FormData =new FormData()
  private router = inject(Router);
  private authService : AuthService = inject(AuthService)

  public userForm = {
    username: '',
    completeName: '',
    role: '',
    password: ''
  }

  handleRegisterForm() {
    const userFormValues = Object.values(this.userForm)

    if(userFormValues.includes('')) {
    alert('Todos los campos son obligatorios')
    return
    }

    this.userFormData.append('username', this.userForm.username)
    this.userFormData.append('completeName', this.userForm.completeName) // Añadimos el nuevo campo
    this.userFormData.append('role', this.userForm.role)
    this.userFormData.append('password', this.userForm.password)

    this.authService.register(this.userForm).subscribe({
      next: (data: any) =>{
        alert('Usuario registrado correctamente. Redirigiendo al login...');
        setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1000);
    },
    error: (error) =>{
      alert('Error al registrar el usuario')
      console.log(error)
    }
  })
}

}