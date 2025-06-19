import { Component, inject } from '@angular/core';
import { ReaderService } from '../services/reader.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderLoggedComponent } from '../header-logged/header-logged.component';
import { HeaderUnloggedComponent } from '../header-unlogged/header-unlogged.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [DatePipe, HeaderLoggedComponent, HeaderUnloggedComponent, FooterComponent],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css'
})
export class ArticleViewComponent {
  public token: any = localStorage.getItem("token");
  private readerService: ReaderService = inject(ReaderService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public article: any = [];
  
  ngOnInit(){
      this.activatedRoute.params.subscribe( (params) => {
        const id: string = params["id"]  
        this.readerService.getArticleById(id).subscribe(
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
