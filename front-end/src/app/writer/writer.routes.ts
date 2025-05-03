import { Routes } from '@angular/router';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { DraftDetailsComponent } from './components/draft-details/draft-details.component';
import { ModifyArticleComponent } from './components/modify-article/modify-article.component';
import { AsignEditorComponent } from './components/asign-editor/asign-editor.component';

export const WRITER_ROUTES: Routes = [
    {
        path: "create-article",
        component: CreateArticleComponent
    },
    {
        path: "draft-list",
        component: DraftListComponent
    },
    {
        path: "draft-details/:id",
        component: DraftDetailsComponent
    },
    {
        path: "modify-article/:id",
        component: ModifyArticleComponent
    },
    {
        path: "asign-editor/:id",
        component: AsignEditorComponent
    }
];
