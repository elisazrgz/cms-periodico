import { Routes } from '@angular/router';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ModifyArticleComponent } from './components/modify-article/modify-article.component';
import { AssignEditorComponent } from './components/assign-editor/assign-editor.component';
import { ArticleDetailsComponent } from '../editor/components/article-details/article-details.component';
import { ArticleListComponent } from '../editor/components/article-list/article-list.component';

export const WRITER_ROUTES: Routes = [
    {
        path: "create-article",
        component: CreateArticleComponent
    },
    {
        path: "article-list",
        component: ArticleListComponent
    },
    {
        path: "article-details/:id",
        component: ArticleDetailsComponent
    },
    {
        path: "modify-article/:id",
        component: ModifyArticleComponent
    },
    {
        path: "assign-editor/:id",
        component: AssignEditorComponent
    }
];
