import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // <-- NGModel lives here
import { AppRoutingModule } from './app-routing.module'; // <-- Our module for routing the app.

import { HttpClientModule } from '@angular/common/http'; // <-- angulars mechanism for communicating with a remote server over HTTP (Defined here to make it available everywhere in the app)

// We can simulate/mimic communication with a remote data server by using the In-memory Web API module
// The app will make requests to receive responses from the HttpClient without knowing that the In-memory Web APi is intercepting those requests and applying them to an in-memory data store and returning simulated responses.
// Need to be added to the import array after the HttpClientModule to work properly
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ], // All components, directives, and piples blonging to the NgModule
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ], // All the modules required by the component templates declared in this module
  providers: [],  // Global collection of services that are accessable by the entire app
  bootstrap: [AppComponent] // this is the root component which hosts all other app views (bootstrap propery is only ever set by your root NgModule)
})
export class AppModule { } // This is imported in the main.ts file for bootstrapping the application
