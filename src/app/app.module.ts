// App Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// App Components
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';

//App services
import { QueryServiceService } from './query-service.service';

// App Routing
const appRoutes: Routes = [
  { path: '', component: ItemsComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [QueryServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
