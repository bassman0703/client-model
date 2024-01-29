import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {HttpClientModule} from "@angular/common/http";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {AddOrEditClientComponent} from "../../../clients/components/add-or-edit-client/add-or-edit-client.component";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../ui/header/header.component";
import {AccountsListComponent} from "../../components/accounts-list/accounts-list.component";

@Component({
  selector: 'app-accounts',
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
    HeaderComponent,
    AccountsListComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {

}
