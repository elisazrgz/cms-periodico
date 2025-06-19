import { Component, inject } from '@angular/core';
import { WriterService } from '../../services/writer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderLoggedComponent } from '../../../reader/components/header-logged/header-logged.component';
import { FooterComponent } from '../../../reader/components/footer/footer.component';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [RouterLink, DatePipe, HeaderLoggedComponent, FooterComponent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {  
  private writerService: WriterService = inject(WriterService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public article: any = [];
  
  ngOnInit(){
      this.activatedRoute.params.subscribe( (params) => {
        const id: string = params["id"]  
        this.writerService.getArticleById(id).subscribe(
          (data: any) => {
              this.article = data[0];
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
