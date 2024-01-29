import {Component, OnInit} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../../core/services/user.service";
import {User, UserRequest} from "../../../../core/interfaces";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CommonModule} from "@angular/common";
import {AddOrEditClientComponent} from "../../components/add-or-edit-client/add-or-edit-client.component";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {first} from "rxjs";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";


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
    InputTextModule,
    AddOrEditClientComponent,
    FormsModule,

  ],
  providers: [HttpClient, MessageService, ConfirmationService],

  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent {
  users: User[] = []
  globalFilter = ''
  request: UserRequest = {
    first: 0,
    last: 10,
    sortField: '',
    sortOrder: 1,
    filter: {
      clientNumber: ''
    }
  }
  displayAddModal = false;
  selectedUser: any = null;
  totalRecords: number = 0
  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }



  getUserLList() {
    this.userService.getUserList(this.request)
      .subscribe(res => {
        console.log(res)
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

  loadUsers($event: TableLazyLoadEvent) {
    console.log($event)
    this.request.sortField = $event.sortField || '';
    this.request.sortOrder = $event.sortOrder || 1
    this.request.first = $event.first || 0
    this.getUserLList()
  }

  protected readonly first = first;

  filterUsers() {
    this.request = {
      ...this.request,
      first: 0,
      filter: {
        clientNumber: this.globalFilter
      }
    }
    this.getUserLList()
  }
}
