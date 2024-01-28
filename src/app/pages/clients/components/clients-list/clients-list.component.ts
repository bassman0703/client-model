import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../../../../core/services/user.service";
import {User} from "../../../../core/interfaces";
import {json} from "express";
import {async} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    AsyncPipe,
    NgForOf,
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent implements OnInit {
  users!: User

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUserList().subscribe(
      (res) =>
      {
        this.users = res
        console.log('resss',res)
      }
    )
  }

  protected readonly json = json;
}
