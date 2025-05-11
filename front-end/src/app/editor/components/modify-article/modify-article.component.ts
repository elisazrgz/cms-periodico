import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../../reader-views/components/footer/footer.component';
import { HeaderLoggedComponent } from '../../../reader-views/components/header-logged/header-logged.component';
import { WriterService } from '../../../writer/services/writer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-article',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderLoggedComponent, FooterComponent],
  templateUrl: './modify-article.component.html',
  styleUrl: './modify-article.component.css'
})
export class ModifyArticleComponent {
  private writerService: WriterService = inject(WriterService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  articleForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    image: new FormControl(""),
    body: new FormControl("", Validators.required),
    section: new FormControl("", Validators.required),
    highlight: new FormControl(false, Validators.required),
  })

  // Se muestran los datos existentes del artículo
  ngOnInit(){
    this.activatedRoute.params.subscribe( (params) => {
      const id: any = params["id"];
      this.writerService.getArticleById(id).subscribe( (data: any) => {
        this.articleForm.setValue({
          title: data[0].title,
          subtitle: data[0].subtitle,
          image: data[0].image,
          body: data[0].body,
          section: data[0].section,
          highlight: data[0].highlight
        })
        } )
    })
}
 
// Método que maneja la selección del archivo
onFileSelected(event: any) {
  const file = event.target.files[0]; // Solo se toma el primer archivo
  if (file) {
    // Se guarda el archivo para ser enviado más tarde
    this.articleForm.get('image')?.setValue(file);
  }
}

  handleEditArticleForm(){
    if(this.articleForm.valid) {
      const formData = new FormData();

      // Se rellena el formData con los datos del formulario
      for (const key in this.articleForm.value) {
        if (this.articleForm.value.hasOwnProperty(key)) {
          const value = this.articleForm.value[key];

        // Si el campo es la imagen, se añade al FormData
        if (key === 'image') {
          const imageFile = this.articleForm.get('image')?.value;
          if (imageFile && imageFile instanceof File) {
            formData.append(key, imageFile, imageFile.name);
          } else if (imageFile === '' || !imageFile) {
            // Si no se ha seleccionado una nueva imagen, no se añade el campo 'image' al formData
          }
        } else {
          // Para otros campos, simplemente se añaden los valores
          if (value || value === false) {
            formData.append(key, value);
          }
        }
      }
    }

      // Se envian los datos actualizados
      this.activatedRoute.params.subscribe( (params) => {
      const id: any = params["id"];
      this.writerService.modifyArticleContent(id, formData).subscribe({
        next: (data: any) => {
          alert("Artículo modificado con éxito")
          this.router.navigate([`/editor/revisable-details/${id}`])
        },
        error: (error: any) => {
          console.log(error);
          alert("Se produjo un error")
          }
        })
      })
    
    }
  }

}
