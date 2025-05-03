import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  http: HttpClient = inject(HttpClient);
  token: any = localStorage.getItem("token");

  getArticlesByAuthorId(id: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.get(`http://localhost:3600/articles/articlesbyauthor/${id}`, {headers})
  }

  getArticleById(id: string){ 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.get(`http://localhost:3600/articles/articledetails/${id}`, {headers})
    }

  createNewArticle(article: any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.post("http://localhost:3600/articles/create", article, {headers})
  }

  modifyArticleContent(id: string, article: any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.put(`http://localhost:3600/articles/modifycontent/${id}`, article, {headers})
  }

  getAllEditors(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.get("http://localhost:3600/users/alleditors", {headers})
  }

  modifyArticleStatus(id: string, status: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.put(`http://localhost:3600/articles/modifystatus/${id}/${status}`, {}, {headers})
  }
  
  assignArticleEditor(idArticle: string, editorId: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })
    return this.http.put(`http://localhost:3600/articles/assigneditor/${idArticle}/${editorId}/`, {}, {headers})
  }
  
}
