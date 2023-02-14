import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { BooksComponent } from './components/books/books.component';
import { CustomersComponent } from './components/customers/customers.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BooksComponent,
    CustomersComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
