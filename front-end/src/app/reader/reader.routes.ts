import { Routes } from '@angular/router';
import { ArticleViewComponent } from './components/article-view/article-view.component';
import { SectionViewComponent } from './components/section-view/section-view.component';
import { HomepageViewComponent } from './components/homepage-view/homepage-view.component';


export const READER_ROUTES: Routes = [
    {
        path: "",
        component: HomepageViewComponent
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
