import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = "http://localhost:3000/admin/products";

  constructor(private myHttpClient : HttpClient) { }

  addNewProduct(productInfo:object){
    this.myHttpClient.post(this.baseUrl, productInfo);
  }

  updateProduct(productUpdate:object){
    this.myHttpClient.post(this.baseUrl, productUpdate);
  }

  getAllProducts(){
    this.myHttpClient.get(this.baseUrl);
  }

  getProductsByCategory(category:string){
    this.myHttpClient.get(this.baseUrl+`/${category}`);
  }

  deleteAllProducts(){
    this.myHttpClient.delete(this.baseUrl);
  }

  deleteProductById(id:string){
    this.myHttpClient.delete(this.baseUrl+`/${id}`);
  }


}
