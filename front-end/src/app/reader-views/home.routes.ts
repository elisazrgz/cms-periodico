import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ArticleViewComponent } from './components/article-view/article-view.component';
import { SectionViewComponent } from './components/section-view/section-view.component';


export const HOME_ROUTES: Routes = [
    {
        path: "",
        component: HomepageComponent
    },
    {
        path: "section-view/:section",
        component: SectionViewComponent
    },
    {
        path: "article-view/:id",
        component: ArticleViewComponent 
    }
];
