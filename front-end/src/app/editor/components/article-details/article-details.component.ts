import { Component, inject } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderLoggedComponent } from '../../../reader/components/header-logged/header-logged.component';
import { FooterComponent } from '../../../reader/components/footer/footer.component';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HeaderLoggedComponent, FooterComponent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {
  private editorService: EditorService = inject(EditorService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public article: any = [];
  private router: Router = inject(Router);
  
  ngOnInit(){
      this.activatedRoute.params.subscribe( (params) => {
        const id: string = params["id"]  
        this.editorService.getArticleById(id).subscribe(
          (data: any) => {
              this.article = data[0];
          }, (error) => {
            console.log(error);
            alert("Se produjo un error")
          } )
      })
  }

  giveArticleBackToWriter(){
    this.activatedRoute.params.subscribe( (params) => {
      const id: string = params["id"]  
      this.editorService.changeStatus(id, "draft").subscribe(
        (data: any) => {
            this.article = data[0];
            alert("Artículo devuelto al redactor correspondiente")
            this.router.navigate(['/editor/revisable-list'])
        }, (error) => {
          console.log(error);
          alert("Se produjo un error")
        } )
    })
  }

  markAsPublished(){
    this.activatedRoute.params.subscribe( (params) => {
      const id: string = params["id"]  
      this.editorService.changeStatus(id, "publish").subscribe(
        (data: any) => {
            this.article = data[0];
            alert("Artículo publicado en la página del periódico")
            this.router.navigate(['/editor/revisable-list'])
        }, (error) => {
          console.log(error);
          alert("Se produjo un error")
        } )
    })
  }

  // Función para que las secciones se muestren en español
  getSectionInSpanish(section: string): string {
    switch (section) {
      case 'politics': return 'Política';
      case 'economy': return 'Economía';
      case 'science': return 'Ciencia';
      case 'sports': return 'Deportes';
      default: return 'Desconocido'
    }
  }

}
