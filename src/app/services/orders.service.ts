import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = "http://localhost:3000/admin/orders";

  constructor(private myHttpClient : HttpClient) { }

  updateOrderStatus(statusUpdate:{orderID:string,status:string}){
    this.myHttpClient.patch(this.baseUrl,statusUpdate);
  }

  getAllOrders(){
    this.myHttpClient.get(this.baseUrl);
  }

  getOrderById(id:string){
    this.myHttpClient.get(this.baseUrl+`/${id}`);
  }

}
