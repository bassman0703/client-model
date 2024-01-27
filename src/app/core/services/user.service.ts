import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }
  getUserList(): Observable<any>  {
    return this.http.get(this.url)
  }
}
