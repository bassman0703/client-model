import { Component } from '@angular/core';
import {HeaderComponent} from "../ui/header/header.component";
import {ClientsListComponent} from "../clients/components/clients-list/clients-list.component";
import {CardModule} from "primeng/card";
import { HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ClientsListComponent,
    CardModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
