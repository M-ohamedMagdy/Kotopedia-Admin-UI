import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = "http://localhost:3000/admin/orders";

  constructor(private myHttpClient : HttpClient) { }



  updateOrderStatus(orderID:string,status:string){
    return this.myHttpClient.patch(this.baseUrl,{orderID,status});
  }

  getAllOrders(){
    return this.myHttpClient.get(this.baseUrl);
  }

}
