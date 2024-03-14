import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { LoadingModule } from 'src/app/loading/loading.module';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    LoadingModule,
    CommonModule
  ],
})
export class OrderComponent {

  dateDebut : any = ""
  dateFin: any = new Date()
  category = "En attente"
  categories = [
    "Tous",
    "Complet",
    "En attente",
    "Annuler",
  ]

  isLoading = false

  datasources = []

  datasource: any[] = []
  product: any
  user: any
  params: any
  websoket : any

  constructor(
    private element: ElementRef,
    private socket: WebsocketService,
    private api: ApiService,
    private snapParams: ActivatedRoute,
    private http: HttpClient
  ) {

  }

  ngOnInit() {

    this.isLoading = true

    this.loading()

    this.dateFin = new Date();
    this.dateDebut = new Date(this.dateFin);
    // this.dateDebut.setDate(this.dateFin.getDate() - 3);
    this.dateDebut.setDate(1);

    this.user = this.api.getInfo()

    this.params = this.snapParams.snapshot.queryParamMap.get('id')

    this.getData()

    this.filteredAndSorted()



  }

  getData = () => {

    this.websoket = this.socket.connect(`ws://${environment.logistic}ws/getOrders/${this.user.bness.b_id}/${this.params.toString()}`)

    this.websoket.subscribe((res: any) => {

      this.datasources = res.data

      this.datasources.forEach((value: any) => {
        value.command_date = this.convertDateFormat(this.arrangeDateFormat(value.command_date))
      })

      this.datasource = this.datasources

      this.filterOrder(this.category)
    })

  }

  convertDateFormat(dateString: string): string {

    const parts = dateString.split('/');

    const date = new Date(+parts[2], +parts[1] - 1, +parts[0]);

    date.setHours(23, 0, 0, 0);

    const convertedDate = date.toISOString();

    return convertedDate;
  }


  onUpdateStatus = (value: any, myStatus: any) => {
    // console.log(value, myStatus);

    this.datasource.forEach((e: any) => {
      if (e === value) {
        e.status = myStatus
      }
    })

    var status = 0

    if (myStatus === "Complet") {
      status = 1
    }
    else if(myStatus === "En attente") {
      status = 0
    }
    else {
      status = -1
    }

    const data = {
      b_id: value.b_id,
      branch_id: value.branch_id,
      command_id: value.command_id,
      photo_id: value.photo_id,
      product_id: value.product_id,
      status: status,
    }

    this.http.put(`${environment.logisticUrl}order`, data)
    .subscribe((res: any)=> console.log(res) )
  }

  filteredAndSorted = () => {
    this.datasource = this.datasources.filter((item: any) => item.orderType === "Priorité").concat(
      this.datasources.filter((item: any) => item.orderType !== "Priorité")
    );

    this.isLoading = false
    this.loading()
  }

  getMonthDay = (myDate: any) => {
    const dateObject = new Date(myDate);

    const month = dateObject.toLocaleString('fr-FR', { month: 'short' }).replace('.', ' ').slice(0, 3)
    const day = dateObject.getDate();

    return `${month} ${day}`;
  }

  getYear = (myDate: any) => {
    const dateObject = new Date(myDate);

    const year = dateObject.getFullYear()

    return `${year}`;
  }

  filterOrder = (value: string) => {
    this.category = value

    if (value == 'Tous') {
      this.datasource = this.datasources
      this.filteredDatasource()
    } else {
      this.datasource = this.datasources.filter((item: any) => item.status === value)
      this.filteredDatasource()
    }
  }

  searchOrder = (item: string) => {

    if (this.product.length < 1) {
      this.datasource = this.datasources
      this.filteredDatasource()
    } else {
      this.datasource = this.datasources.filter((e: any) =>
        e.name.toLowerCase().includes(this.product.toLowerCase()) ||
        e.orderId.toLowerCase().includes(this.product.toLowerCase())
      )
      this.filteredDatasource()
    }

  }


  dateFilter = () => {
    var _debut: any = new Date(this.dateDebut)
    var _fin: any = new Date(this.dateFin)
    _debut = _debut.toISOString()
    _fin = _fin.toISOString()
    // console.log(_debut);


    this.datasource = this.datasources.filter((item: any) => {

      var orderDate: any = item.command_date
      // orderDate = orderDate.split("/");
      // orderDate = new Date(`${orderDate[2]}-${orderDate[1]}-${orderDate[0]}`);
      // orderDate = orderDate.toISOString()
      // console.log(orderDate);

      return orderDate >= _debut && orderDate <= _fin;
    });
    // console.log(this.datasource);

    this.filteredDatasource()
  }

  filteredDatasource = () => {
    this.datasource = this.datasource.filter(item => item.orderType === "Priorité").concat(
      this.datasource.filter(item => item.orderType !== "Priorité")
    );
  }

  arrangeDateFormat = (myDate: any) => {

    var newValue = myDate.toString()

    return newValue.slice(8,10) + "/" + newValue.slice(5,7) +"/"+ newValue.slice(0, 4)

  }

  loading = () => {
    if (this.isLoading) {
      Swal.fire({
        text: "Chargement des données...",
        didOpen: () => {
          Swal.showLoading()
        }
      })
    } else {
      Swal.close()
    }
  }

}
