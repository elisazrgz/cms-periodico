import { ReaderService } from './../services/reader.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit{
  
  private readerService: ReaderService = inject(ReaderService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public publishedArticles: any [] = [];
  public highlightedArticles: any [] = [];
  public genericArticles: any [] = [];

  // Para destacados, ahora solo necesitamos 3
  public highlightLimit = 3;
  public genericLimit = 12;

  // Artículos principales específicos
  public mainHighlight: any = null;
  public secondaryHighlights: any[] = [];

  ngOnInit(): void {
    this.readerService.getPublishedArticles().subscribe((data: any) => {
      this.publishedArticles = data;

      // Obtener artículos destacados
      const allHighlighted = this.publishedArticles
        .filter((article) => article.highlight === true)
        .slice(0, this.highlightLimit);
      
      // Separar el principal de los secundarios
      if (allHighlighted.length > 0) {
        this.mainHighlight = allHighlighted[0]; // El primero será el principal
        this.secondaryHighlights = allHighlighted.slice(1); // El resto serán secundarios
      }

      // Noticias genéricas (no destacadas)
      this.genericArticles = data
        .filter((article: any) => article.highlight === false)
        .slice(0, this.genericLimit);
    });
  }

}

