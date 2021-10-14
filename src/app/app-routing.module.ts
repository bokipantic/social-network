import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupComponent } from './group/group.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { EmtpyComponent } from './emtpy/emtpy.component';

const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  { path: 'persons', component: GroupComponent, children: [
      { path: '', component: EmtpyComponent },
      { path: ':id', component: PersonDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
