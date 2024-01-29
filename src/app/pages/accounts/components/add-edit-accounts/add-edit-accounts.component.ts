import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {CommonModule} from "@angular/common";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {FocusTrapModule} from "primeng/focustrap";
import {FileUploadModule} from "primeng/fileupload";
import {AccountService} from "../../../../core/services/account.service";
import {accountStatus} from "../../../../core/enums/account-status";
import {currency} from "../../../../core/enums/currency";
import {accountType} from "../../../../core/enums/account-type";

@Component({
  selector: 'app-add-edit-accounts',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    FocusTrapModule,
    DropdownModule,
    ToastModule,
    FileUploadModule,
    CardModule,
  ],
  templateUrl: './add-edit-accounts.component.html',
  styleUrl: './add-edit-accounts.component.scss'
})
export class AddEditAccountsComponent implements OnInit, OnChanges {
  @Input() displayAddModal: boolean = true;
  @Input() selectedAccount: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clicAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "დამატება"
  accountTypes$ = accountType;
  accountStatus$ = accountStatus;
  currency$ = currency;
  form: FormGroup = this.fb.group({
    accountNumber: ["", Validators.required],
    clientNumber: ["", Validators.required],
    currency: ["", Validators.required],
    accountType: ["", Validators.required],
    accountStatus: ["", Validators.required],
  })


  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.selectedAccount){
      this.modalType = "რედაქტირება"
      this.form.patchValue(this.selectedAccount)
    } else {
      this.form.reset();
      this.modalType = "დამატება"

    }
  }

  closeModal() {
    this.form.reset()
    this.clickClose.emit(true);

  }

  addEditAccount() {
    console.log(this.form.value)
    this.accountService.addEditAccount(this.form.value, this.selectedAccount).subscribe(
      res =>{
        this.clicAddEdit.emit(res)
        this.closeModal()
        const msg = this.modalType === 'add' ? 'დამატება' : 'რედაქტირება'
        this.messageService.add({ severity:'success', summary: 'Success', detail: 'msg'});

      },
      error => {
        this.messageService.add({ severity:'error', summary: 'Error', detail: 'Error'});

        console.log('ERROR')
      }
    )
  }

}
