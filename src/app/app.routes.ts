import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'persons', pathMatch: 'full' },
      { path: 'persons', component: PersonListComponent },
      { path: 'persons/add', component: PersonAddComponent },
      { path: 'persons/:id', component: PersonDetailComponent },
      { path: 'persons/:id/edit', component: PersonEditComponent },
      { path: 'requests', component: RequestsListComponent }
    ]
  }
];
