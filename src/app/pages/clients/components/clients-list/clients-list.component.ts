import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../../../../core/services/user.service";
import {NgForOf} from "@angular/common";
import {User} from "../../../../core/interfaces";

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    NgForOf
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent implements OnInit {
  loadData: any

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.getUserLists()
  }

  // getUserLists() {
  //   this.userService.getUserList().subscribe({
  //     next: (res) => {
  //       console.log(res)
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
  getUserLists() {
    this.userService
      .getUserList()
      .subscribe(
        (res: User) => {
          this.loadData = res
        }
      )
  }

}
