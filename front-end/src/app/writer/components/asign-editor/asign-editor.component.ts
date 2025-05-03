import { Component, inject } from '@angular/core';
import { WriterService } from '../../services/writer.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { concatMap } from 'rxjs';
import { HeaderLoggedComponent } from "../../../reader-views/components/header-logged/header-logged.component";
import { FooterComponent } from '../../../reader-views/components/footer/footer.component';

@Component({
  selector: 'app-asign-editor',
  standalone: true,
  imports: [HeaderLoggedComponent, FooterComponent],
  templateUrl: './asign-editor.component.html',
  styleUrl: './asign-editor.component.css'
})
export class AsignEditorComponent {

  private writerService: WriterService = inject(WriterService);
  public editors: any = [];
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(){
    this.writerService.getAllEditors().subscribe((data: any)=>{
      this.editors = data;
    }, error => {
      console.error(error);
      alert("Se produjo un error")
    })
  }

  assignAndSendToEditor(editorId: any){
    
    // Uso de concatmap para encadenar las dos operaciones de manera secuencial:
    this.activatedRoute.params.pipe(
      concatMap(params => {
        const articleId: string = params["id"];
        const status: string = "revisable";
  
        // Se cambia el estado primero
        return this.writerService.modifyArticleStatus(articleId, status).pipe(
          concatMap(() => {
            // Se asigna el editor una vez se ha cambiado el estado
            // (desde el back solo se puede asignar si el artículo es "revisable")
            return this.writerService.assignArticleEditor(articleId, editorId);
          })
        );
      })
    ).subscribe(
      (data) => {
        alert("Artículo asignado con éxito para revisión al editor seleccionado");
        this.router.navigate(["/writer/draft-list"])
      },
      (error) => {
        console.error(error);
        alert("Se produjo un error")
      }
    );
    
  }


}
