import { EditorService } from '../../services/editor.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderLoggedComponent } from '../../../reader/components/header-logged/header-logged.component';
import { FooterComponent } from '../../../reader/components/footer/footer.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [RouterLink, HeaderLoggedComponent, FooterComponent, CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
  private editorService: EditorService = inject(EditorService);
  public articleList: any = [];
  // public drafts = [];
  // public revisables = [];
  // public published = [];
  private editorId: any = localStorage.getItem("_id");
  private router: Router = inject(Router);
  
  ngOnInit(){
    this.editorService.getAllArticles(this.editorId).subscribe({
      next: (data: any) => {
        this.articleList = data.sort((a: any, b: any) => {
          // Se ordenan los artículos según reciben modificaciones
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
      },
      error: (error: any) => {
          console.log(error);
          alert("Se produjo un error")
      }
  })
  }

  // Función para que el estado de las noticias se muestre en español
  getStatusInSpanish(status: string): string {
    switch (status) {
      case 'draft': return 'Devuelto a borrador';
      case 'revisable': return 'En revisión';
      case 'publish': return 'Publicado';
      default: return 'Desconocido'
    }
  }

  // Enlace para cerrar sesión desde el panel de redactor y volver a la homepage
  logOutAndRedirect(){
    localStorage.clear();
    this.router.navigate(["/home/homepage"])
  }
    
}
