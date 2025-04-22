import { HeaderUnloggedComponent } from './../header-unlogged/header-unlogged.component';
import { Component, inject } from '@angular/core';
import { ReaderService } from '../services/reader.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderLoggedComponent } from '../header-logged/header-logged.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-section-view',
  standalone: true,
  imports: [DatePipe, RouterLink, HeaderLoggedComponent, HeaderUnloggedComponent, FooterComponent],
  templateUrl: './section-view.component.html',
  styleUrl: './section-view.component.css'
})
export class SectionViewComponent {
  public token: any = localStorage.getItem("token");
  
  private readerService: ReaderService = inject(ReaderService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  public publishedArticles: any[] = [];
  public article: any = [];
  public section: string = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      const section = params['section'];

      this.readerService.getPublishedArticles().subscribe((data: any) => {
        this.publishedArticles = data.filter(
            (article: any) =>
             article.section === section
        );
      });
    });

    this.activatedRoute.params.subscribe(params=> {
      this.section = params['section']
    })
  }

  getSectionInSpanish(section: string): string {
    switch (section) {
      case 'politics': return 'Política';
      case 'economy': return 'Economía';
      case 'science': return 'Ciencia';
      case 'sports': return 'Deportes';
      case 'culture': return 'Cultura';
      default: return 'Desconocido'
    }
  }
}
