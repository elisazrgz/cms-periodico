import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WriterService } from '../../services/writer.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderLoggedComponent } from '../../../reader-views/components/header-logged/header-logged.component';
import { FooterComponent } from '../../../reader-views/components/footer/footer.component';


@Component({
  selector: 'app-draft-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderLoggedComponent, FooterComponent],
  templateUrl: './draft-list.component.html',
  styleUrl: './draft-list.component.css'
})
export class DraftListComponent {

  private writerService: WriterService = inject(WriterService);
  public articleList: any = [];
  public drafts = [];
  public revisables = [];
  public published = [];
  private authorId: any = localStorage.getItem("_id");
  private router: Router = inject(Router);
  
  ngOnInit(){
    this.writerService.getArticlesByAuthorId(this.authorId).subscribe({
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
      case 'draft': return 'Borrador';
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
