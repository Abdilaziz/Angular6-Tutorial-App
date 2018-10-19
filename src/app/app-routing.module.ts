import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Routes tell the router which view to display when a user clicks a link or pastes a URL into a browser address bar.
// An Angular Route has two typical properties: 
// 1) path: String that matches the URL in the browser address bar. 
// 2) component: the component that the router should create when navigating to this route

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirects URL that fully matches the empty path to the route whose path is '/dashboard'
  {path: 'dashboard', component: DashboardComponent },
  {path: 'heroes', component: HeroesComponent },
  {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ] // exporting RouterModule makes router directives available for use in the AppModule components that will need them
  // ,declarations: [] // declerations are for components, but you generally don't declare componenets in a routing module, so you can delete it.
})
export class AppRoutingModule { }
