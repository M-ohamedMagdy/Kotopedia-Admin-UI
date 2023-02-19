import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "http://localhost:3000/admin/users";

  constructor(private myHttpClient : HttpClient) { }

  getAllUsers(){
    return this.myHttpClient.get(this.baseUrl);
  }

  getUserById(id:string){
    return this.myHttpClient.get(this.baseUrl+`/${id}`);
  }

  deleteAllUsers(){
    return this.myHttpClient.delete(this.baseUrl);
  }

  deleteUserById(id:string){
    return this.myHttpClient.delete(this.baseUrl+`/${id}`);
  }
}
