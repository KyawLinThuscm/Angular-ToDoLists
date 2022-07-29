import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTasksComponent } from './pages/create-tasks/create-tasks.component';
import { EmplyoeeListsComponent } from './pages/emplyoee-lists/emplyoee-lists.component';

const routes: Routes = [
  { path: '' , component: CreateTasksComponent },
  { path: 'employee-lists', component: EmplyoeeListsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
