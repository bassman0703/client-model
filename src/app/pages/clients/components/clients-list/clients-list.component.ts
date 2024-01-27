import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent implements OnInit {
  products = [

]
  constructor() {}

  ngOnInit() {

  }


}
