import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = "http://localhost:3000/admin/products";

  constructor(private myHttpClient : HttpClient) { }

  addNewProduct(productInfo:object){                            //Done
    return this.myHttpClient.post(this.baseUrl, productInfo);
  }

  updateProduct(productUpdate:object){
    return this.myHttpClient.patch(this.baseUrl, productUpdate); //
  }

  getAllProducts(){
    return this.myHttpClient.get(this.baseUrl); // Done
  }

  getProductsByCategory(category:string){       //Done
    return this.myHttpClient.get(this.baseUrl+`/${category}`);
  }

  deleteAllProducts(){
    return this.myHttpClient.delete(this.baseUrl); //Done
  }

  deleteProductById(id:string){
    return this.myHttpClient.delete(this.baseUrl+`/${id}`); //
  }


}
