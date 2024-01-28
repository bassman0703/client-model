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
  getUserList(): Observable<User>  {
    return this.http.get<User>(this.url)
  }
}
