import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private orderServ:OrdersService ){

  }

  Orders:any;
  ngOnInit(): void {
    this.orderServ.getAllOrders().subscribe(
      {
        next:(res)=>{
          this.Orders = res;
          console.log(this.Orders)
          console.log(this.Orders[0].productsInOrder[0].title)
        },
        error(err){console.log(err)}
      }
    )
  }


  onEdit(item: any) {
    this.Orders.forEach((element: { isEdit: boolean; }) => {element.isEdit = false;});
    item.isEdit = true;
  }

  updateStatus(id:any,newState:string){
    this.orderServ.updateOrderStatus(id,newState).subscribe(
      {
        next:(res)=>{
          console.log(res)
        },
        error(err){console.log(err)}
      }
    )
    console.log(id);
  }
}
