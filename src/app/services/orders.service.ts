import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = "http://localhost:3000/admin/orders";

  constructor(private myHttpClient : HttpClient) { }

  updateOrderStatus(statusUpdate:{orderID:string,status:string}){
    return this.myHttpClient.patch(this.baseUrl,statusUpdate);
  }

  getAllOrders(){
    return this.myHttpClient.get(this.baseUrl);
  }

  getOrderById(id:string){
    return this.myHttpClient.get(this.baseUrl+`/${id}`);
  }

}
