import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  http: HttpClient = inject(HttpClient);
  token: any=localStorage.getItem("token");
  

  getAllArticles(id: string){
    const headers = new HttpHeaders({
      Authorization:`Bearer ${this.token}`
    })
    return this.http.get(`http://localhost:3600/articles/articlesbyeditor/${id}`, {headers})
  }

  getArticleById(id: string){ 
    const headers = new HttpHeaders({
      Authorization:`Bearer ${this.token}`
    })
    return this.http.get(`http://localhost:3600/articles/articledetails/${id}`, {headers})
  } 


  updateArticle(id: string, content: any){
    const headers = new HttpHeaders({
      Authorization:`Bearer ${this.token}`
    })
    return this.http.put(`http://localhost:3600/articles/modifycontent/${id}`, content,{headers})
  }

  changeStatus(id: string, status: string){
    const headers = new HttpHeaders({
      Authorization:`Bearer ${this.token}`
    })
    return this.http.put(`http://localhost:3600/articles/modifystatus/${id}/${status}`, {},{headers})
  }
}