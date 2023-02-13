import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { BooksComponent } from './------------';
// import { CustomersComponent } from './------------';
// import { OrdersComponent } from './------------';
const routes: Routes = [
  // {path:"Books",component:BooksComponent},
   // {path:"Customers",component:CustomersComponent},
    // {path:"Orders",component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
