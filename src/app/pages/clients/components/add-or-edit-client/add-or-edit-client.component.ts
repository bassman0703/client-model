import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {FocusTrapModule} from "primeng/focustrap";
import {UserService} from "../../../../core/services";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { DropdownModule} from "primeng/dropdown";
import {genders} from "../../../../core/enums/gender";
import {FileUploadModule} from "primeng/fileupload";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-add-or-edit-client',
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
  providers: [HttpClient, MessageService],
  templateUrl: './add-or-edit-client.component.html',
  styleUrl: './add-or-edit-client.component.scss'
})
export class AddOrEditClientComponent implements OnInit, OnChanges {
  @Input() displayAddModal: boolean = true;
  @Input() selectedUser: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clicAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "დამატება"
  genders$ = genders;
  form: FormGroup = this.fb.group({
    clientNumber: ["", Validators.required],
    firsName: ["", Validators.required],
    lastName: ["", Validators.required],
    gender: [""],
    personalNumber: ["", Validators.required],
    phoneNumber: ["", Validators.required],
    legalCountry: ["", Validators.required],
    legalCity: ["", Validators.required],
    legalAddress: ["", Validators.required],
    actualCountry: ["", Validators.required],
    actualCity: ["", Validators.required],
    actualAddress: ["", Validators.required],

  })


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
  }
ngOnChanges() {
    if (this.selectedUser){
      this.modalType = "რედაქტირება"
      this.form.patchValue(this.selectedUser)
    } else {
      this.form.reset();
      this.modalType = "დამატება"

    }
}

  closeModal() {
    this.form.reset()
    this.clickClose.emit(true);

  }

  addEditUser() {
    console.log(this.form.value)
    this.userService.addEditUser(this.form.value, this.selectedUser).subscribe(
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
