import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

    http: HttpClient = inject(HttpClient)
    
    getPublishedArticles(){
    return this.http.get('http://localhost:3600/articles/allpublishedarticles')
    }

    getArticleById(_id: string){
      return this.http.get(`http://localhost:3600/articles/articledetails/${_id}`)
    }
    
}
