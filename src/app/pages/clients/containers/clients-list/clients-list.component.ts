import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "../../../../core/services/user.service";
import {User} from "../../../../core/interfaces";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CommonModule} from "@angular/common";
import {AddOrEditClientComponent} from "../../components/add-or-edit-client/add-or-edit-client.component";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    AddOrEditClientComponent,

  ],
  providers: [HttpClient, MessageService, ConfirmationService],

  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent implements OnInit {
  users: User[] = []
  displayAddModal = false;
  selectedUser: any = null;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {

    this.getUserLList()
  }

  getUserLList() {
    this.userService.getUserList()
      .subscribe(res => {
        this.users = res
      })
  }

  add() {
    this.displayAddModal = true

  }
    showAddModal(){
    this.displayAddModal = true;
    this.selectedUser = null
    }
  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed
  }

  saveOrUpdateList(newData: any) {
    if (newData.id === this.selectedUser.id) {
      const productIndex = this.users.findIndex(data => data.id === newData.id)
      this.users[productIndex] =newData;
    } else {
      this.users.unshift(newData)

    }
  }

  editUser(user: User) {
    this.displayAddModal = true;
    this.selectedUser = user
  }

  delete(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(
          res=>{
            this.users = this.users.filter(data => data.id !== user.id)
            this.messageService.add({ severity:'success', summary: 'Success', detail: 'წაიშალა'});

          },
          error => {
            this.messageService.add({ severity:'error', summary: 'Error', detail: 'error'});

          }
        )
      }
    });
  }
}
