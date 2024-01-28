import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }
  getUserList(): Observable<User[]>  {
    return this.http.get<User[]>(this.url)
  }
  addEditUser(postData: any, selectedUser: any) {
    if ( !selectedUser){
      return this.http.post(this.url, postData)
    } else {
      return this.http.put(`http://localhost:3000/users/${selectedUser.id}`, postData)
    }
  }
  deleteUser(userId: number){
    return this.http.delete( `http://localhost:3000/users/${userId}` )
  }
}
