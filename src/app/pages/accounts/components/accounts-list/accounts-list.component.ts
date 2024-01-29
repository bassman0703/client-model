import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, MessageService} from "primeng/api";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {CommonModule} from "@angular/common";
import {CardModule} from "primeng/card";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {Account, AccountRequest} from "../../../../core/interfaces/account";
import {AccountService} from "../../../../core/services/account.service";
import {AddEditAccountsComponent} from "../add-edit-accounts/add-edit-accounts.component";

@Component({
  selector: 'app-accounts-list',
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
    FormsModule,
    AddEditAccountsComponent,
  ],
  providers: [HttpClient, MessageService, ConfirmationService],

  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss'
})
export class AccountsListComponent {
  accounts: Account[] = []
  globalFilter = ''
  request: AccountRequest = {
    first: 0,
    last: 10,
    sortField: '',
    sortOrder: 1,
    filter: {
      clientNumber: ''
    }
  }
  displayAddModal = false;
  selectedAccount: any = null;
  totalRecords: number = 0
  constructor(
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }



  getAccountLList() {
    this.accountService.getAccountList(this.request)
      .subscribe(res => {
        console.log(res)
        this.accounts = res
      })
  }

  add() {
    this.displayAddModal = true

  }
  showAddModal(){
    this.displayAddModal = true;
    this.selectedAccount = null
  }
  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed
  }

  saveOrUpdateList(newData: any) {
    if (newData.id === this.selectedAccount.id) {
      const productIndex = this.accounts.findIndex(data => data.id === newData.id)
      this.accounts[productIndex] =newData;
    } else {
      this.accounts.unshift(newData)

    }
  }

  editAccount(account: Account) {
    this.displayAddModal = true;
    this.selectedAccount = account
  }

  delete(account: Account) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.accountService.deleteAccount(account.id).subscribe(
          res=>{
            this.accounts = this.accounts.filter(data => data.id !== account.id)
            this.messageService.add({ severity:'success', summary: 'Success', detail: 'წაიშალა'});

          },
          error => {
            this.messageService.add({ severity:'error', summary: 'Error', detail: 'error'});

          }
        )
      }
    });
  }

  loadAccount($event: TableLazyLoadEvent) {
    console.log($event)
    this.request.sortField = $event.sortField || '';
    this.request.sortOrder = $event.sortOrder || 1
    this.request.first = $event.first || 0
    this.getAccountLList()
  }


  filteraccount() {
    this.request = {
      ...this.request,
      first: 0,
      filter: {
        clientNumber: this.globalFilter
      }
    }
    this.getAccountLList()
  }
}
