import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private orderServ:OrdersService ){}

  POSTS:any;
  page:number=1;
  count:number=0;
  tablesize:number=6;
  tablesizes:any=[3,6,9,12];
  Orders:any;
  arrOfProductsInOrder:any;
  totalPrice=0;

  statusOptions: any[] = [{value: 'pending'},{value: 'accepted'},{value: 'rejected'}];

  ngOnInit(): void {
    this.orderServ.getAllOrders().subscribe(
      {
        next:(res)=>{
          this.Orders = res;
          console.log(this.Orders)
          this.Orders.forEach((element:any) => {
            this.arrOfProductsInOrder=element.productsInOrder;
            console.log(this.arrOfProductsInOrder)
          });
        },
        error(err){console.log(err)}
      }
    )
  }


  /*dropDownData=["pending","accepted","rejected"]

  onOptionsSelected(id:any,newStatus:string){
    console.log("the selected value is " + newStatus);
    console.log("the selected id is " + id);
    this.orderServ.updateOrderStatus(id,newStatus).subscribe(
      {
        next:(res)=>{
          console.log(res)
        },
        error(err){console.log(err)}
      }
    )
  }*/

  search(status:any){
    this.orderServ.getOrdersByStatus(status).subscribe({
      next:(res)=>{
        this.Orders = res;
              console.log(this.Orders)
              this.Orders.forEach((element:any) => {
                this.arrOfProductsInOrder=element.productsInOrder;
                console.log(this.arrOfProductsInOrder)})
    },
      error:(err)=>{console.log(err);
      }
    });
  }

  spanCondition = true;

  editBtn(currentStatus:any){
      this.spanCondition = !this.spanCondition;
  }

  updateStatus(orderID:any, newStatus:any){
    this.orderServ.updateOrderStatus(orderID, newStatus).subscribe({
      next:(res)=>{
        console.log(res)
        this.orderServ.getAllOrders().subscribe(
          {
            next:(res)=>{
              this.Orders = res;
              console.log(this.Orders)
              this.Orders.forEach((element:any) => {
                this.arrOfProductsInOrder=element.productsInOrder;
                console.log(this.arrOfProductsInOrder)
              });
            },
            error(err){console.log(err.message)}
          }
        )
        this.spanCondition = !this.spanCondition;
      },
      error:(error)=>{alert(error.error); this.spanCondition = !this.spanCondition;}
    });
  }

  onTableDataChange(event:any){
    this.page=event;
    this.orderServ.getAllOrders().subscribe(
      {
        next:(res)=>{
          this.Orders = res;
          console.log(this.Orders)
          this.Orders.forEach((element:any) => {
            this.arrOfProductsInOrder=element.productsInOrder;
            console.log(this.arrOfProductsInOrder)
          });
        },
        error(err){console.log(err)}
      }
    )
  }

  onTableSizeChange(event:any){
    this.tablesize=event.target.value;
    this.page=1;
    this.orderServ.getAllOrders().subscribe(
      {
        next:(res)=>{
          this.Orders = res;
          console.log(this.Orders)
          this.Orders.forEach((element:any) => {
            this.arrOfProductsInOrder=element.productsInOrder;
            console.log(this.arrOfProductsInOrder)
          });
        },
        error(err){console.log(err)}
      }
    )
  }
}
