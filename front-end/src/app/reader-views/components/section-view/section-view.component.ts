import { Component, inject } from '@angular/core';
import { ReaderService } from '../services/reader.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-section-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './section-view.component.html',
  styleUrl: './section-view.component.css'
})
export class SectionViewComponent {
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
}
