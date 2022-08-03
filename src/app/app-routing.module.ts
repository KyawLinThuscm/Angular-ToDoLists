import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTasksComponent } from './pages/create-tasks/create-tasks.component';
import { EmplyoeeListsComponent } from './pages/emplyoee-lists/emplyoee-lists.component';
import { DetailComponent } from './pages/detail/detail.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';

const routes: Routes = [
  { path: '' , component: EmplyoeeListsComponent },
  { path: 'create-task', component: CreateTasksComponent},
  { path: 'update-form/:id', component: UpdateFormComponent },
  { path: 'detail/:id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
