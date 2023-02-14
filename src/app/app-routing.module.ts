import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { CustomersComponent } from './components/customers/customers.component';
// import { OrdersComponent } from './------------';
const routes: Routes = [
  {path:"books",component:BooksComponent},
   {path:"customers",component:CustomersComponent},
    // {path:"Orders",component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
