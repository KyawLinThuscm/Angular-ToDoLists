import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTasksComponent } from './pages/create-tasks/create-tasks.component';
import { EmplyoeeListsComponent } from './pages/emplyoee-lists/emplyoee-lists.component';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { HeaderComponent } from './components/header/header.component';
import { DetailComponent } from './pages/detail/detail.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AppComponent,
    CreateTasksComponent,
    EmplyoeeListsComponent,
    DetailComponent,
    UpdateFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    AngularMaterialImportsModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
