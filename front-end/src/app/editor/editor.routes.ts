import { Routes } from '@angular/router';
import { ModifyArticleComponent } from './components/modify-article/modify-article.component';
import { RevisableListComponent } from './components/revisable-list/revisable-list.component';
import { editorGuard } from './guard/editor.guard';
import { RevisableDetailsComponent } from './components/revisable-details/revisable-details.component';

export const EDITOR_ROUTES: Routes = [
    {
        path: "modify-article/:id",
        component: ModifyArticleComponent,
        canActivate: [editorGuard]
    },
    {
        path: "revisable-list",
        component: RevisableListComponent,
        canActivate: [editorGuard]
        
    },
    {
        path: "revisable-details/:id",
        component: RevisableDetailsComponent,
        canActivate: [editorGuard]
    }
];


