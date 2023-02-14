import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "http://localhost:3000/admin/users";

  constructor(private myHttpClient : HttpClient) { }

  getAllUsers(){
    this.myHttpClient.get(this.baseUrl);
  }

  getUserById(id:string){
    this.myHttpClient.get(this.baseUrl+`/${id}`);
  }

  deleteAllUsers(){
    this.myHttpClient.delete(this.baseUrl);
  }

  deleteUserById(id:string){
    this.myHttpClient.delete(this.baseUrl+`/${id}`);
  }
}
