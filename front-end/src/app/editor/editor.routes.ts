import { Routes } from '@angular/router';
import { ModifyArticleComponent } from './components/modify-article/modify-article.component';
import { editorGuard } from './guard/editor.guard';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

export const EDITOR_ROUTES: Routes = [
    {
        path: "modify-article/:id",
        component: ModifyArticleComponent,
        canActivate: [editorGuard]
    },
    {
        path: "article-list",
        component: ArticleListComponent,
        canActivate: [editorGuard]
        
    },
    {
        path: "article-details/:id",
        component: ArticleDetailsComponent,
        canActivate: [editorGuard]
    }
];


