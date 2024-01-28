import { Component } from '@angular/core';
import {HeaderComponent} from "../ui/header/header.component";
import {ClientsListComponent} from "../clients/containers/clients-list/clients-list.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ClientsListComponent,
    HttpClientModule,
  ],
  providers:[HttpClient],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
