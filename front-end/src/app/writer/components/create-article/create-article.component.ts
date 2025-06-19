import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WriterService } from '../../services/writer.service';
import { HeaderLoggedComponent } from '../../../reader/components/header-logged/header-logged.component';
import { FooterComponent } from '../../../reader/components/footer/footer.component';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderLoggedComponent, FooterComponent],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent {
  private writerService: WriterService = inject(WriterService);
  private router: Router = inject(Router);
  private writerId: any = localStorage.getItem("_id");

  draftForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    image: new FormControl(""),
    body: new FormControl("", Validators.required),
    section: new FormControl("", Validators.required),
    authorId: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    highlight: new FormControl(false, Validators.required),
    // el valor por defecto será 'false' y si se marca la casilla cambia a "true"
  })

  // Para manejar la selección del archivo:
  onFileSelected(event: any) {
    const file = event.target.files[0]; // Solo toma el primer archivo
    if (file) {
      // Se guarda el archivo para ser enviado más tarde
      this.draftForm.get('image')?.setValue(file);
    }
  }

  handleCreateArticleForm(){
    // Se asigna el id del autor loggeado y se añade al formulario
    if (!this.writerId) {
      console.error("El ID del autor no está disponible en localStorage");
      return;  // redirige al usuario si no tiene id de redactor
    }
    this.draftForm.patchValue({ authorId: this.writerId });

    // Verificar si el formulario es válido
    if (!this.draftForm.valid) {
      alert("Por favor, rellene todos los campos obligatorios");
      return; // no se continua si faltan campos
    } 
    
    const formData = new FormData();
        
    // Se rellena el formData con los datos del formulario
    for (const key in this.draftForm.value) {
      if (this.draftForm.value.hasOwnProperty(key)) {
          
          // Si el campo es la imagen, se añade al FormData
          if (key === 'image') {
            const imageFile = this.draftForm.get('image')?.value;
            if (imageFile) {
              formData.append(key, imageFile, imageFile.name);
            } 
          } else {
            formData.append(key, this.draftForm.value[key]);
          }
        }
      }

    // Se envía el formData al back
    this.writerService.createNewArticle(formData).subscribe({
      next: (data: any) => {
        console.log(data);  
        alert("Borrador creador con éxito");
        this.router.navigate(["/writer/draft-list"])
          },
      error: (error: any) => {
        console.log("Error al crear el borrador");
        alert("Se produjo un error")
        }
      })
      
  }
}
