import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTasksComponent } from './pages/create-tasks/create-tasks.component';
import { EmplyoeeListsComponent } from './pages/emplyoee-lists/emplyoee-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTasksComponent,
    EmplyoeeListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
