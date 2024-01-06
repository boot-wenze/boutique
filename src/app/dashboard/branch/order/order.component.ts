import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
    CommonModule
  ],
})
export class OrderComponent {

  dateDebut : any = ""
  dateFin: any = new Date()
  category = "Tous"
  categories = [
    "Tous",
    "Complet",
    "En attente",
    "Annuler",
    // "DAB",
  ]

  datasources = [
    {
      id: 1,
      orderId: "# 758540997",
      name: "Bracelet",
      photo: "https://www.bijourama.com/media/produits/maserati/img/montre-homme--maserati-traguardo--r8873612048-bracelet-acier-noir_r8873612048-1_1140x1140.jpg",
      orderDate: "05/01/2024",
      currency: "$",
      price: 45,
      status: "En attente",
      orderType: "Normal",
      deliveringDate: "20/01/2024"
    },
    {
      id: 2,
      orderId: "# 40976909",
      name: "Nike",
      photo: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
      orderDate: "03/01/2024",
      currency: "$",
      price: 70,
      status: "Complet",
      orderType: "Priorité",
      deliveringDate: "04/01/2024"
    },
    {
      id: 3,
      orderId: "# 5464246363",
      name: "D&G",
      photo: "https://i3.optical-center.fr/workspace_prods/DOLCE--GABBANA-DG-4437-501-87-51-20-33981_HD.jpg?1689108323",
      orderDate: "02/01/2024",
      currency: "$",
      price: 145,
      status: "En attente",
      orderType: "Priorité",
      deliveringDate: "03/01/2024"
    },
    {
      id: 4,
      orderId: "# 4695827529",
      name: "Ceinture",
      photo: "https://www.paulmarius.fr/media/catalog/product/p/a/paulmarius_france_ceinture_cuir_marron_beige_boucle_laiton_reglable_homme_femme_9da5.jpg",
      orderDate: "06/01/2024",
      currency: "$",
      price: 445,
      status: "Annuler",
      orderType: "Normal",
      deliveringDate: "10/01/2024"
    },
    {
      id: 5,
      orderId: "# 98572858249",
      name: "Costume",
      photo: "https://www.cdiscount.com/pdt2/3/1/0/1/700x700/mp02445310/rw/costume-trois-pieces-slim-fit-par-cloud-style-noir.jpg",
      orderDate: "01/01/2024",
      currency: "$",
      price: 100,
      status: "Complet",
      orderType: "Normal",
      deliveringDate: "05/01/2024"
    },
    {
      id: 6,
      orderId: "# 5376383653",
      name: "Pull",
      photo: "https://www.niagara-pressing.fr/wp-content/uploads/2019/08/Pull.jpg",
      orderDate: "02/01/2024",
      currency: "$",
      price: 1045,
      status: "Annuler",
      orderType: "Priorité",
      deliveringDate: "03/01/2024"
    },
  ]

  datasource: any[] = []
  product : any

  constructor(
    private element: ElementRef
  ) {

  }

  ngOnInit() {

    this.category = "Tous"
    this.dateFin = new Date();
    this.dateDebut = new Date(this.dateFin);
    // this.dateDebut.setDate(this.dateFin.getDate() - 3);
    this.dateDebut.setDate(1);

    this.filteredAndSorted()
  }

  filteredAndSorted = () => {
    this.datasource = this.datasources.filter(item => item.orderType === "Priorité").concat(
      this.datasources.filter(item => item.orderType !== "Priorité")
    );
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
      this.datasource = this.datasources.filter(item => item.status === value)
      this.filteredDatasource()
    }
  }

  searchOrder = (item: string) => {

    if (this.product.length < 1) {
      this.datasource = this.datasources
      this.filteredDatasource()
    } else {
      this.datasource = this.datasources.filter(e =>
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

    this.datasource = this.datasources.filter(item => {
      var orderDate: any = item.orderDate
      orderDate = orderDate.split("/");
      orderDate = new Date(`${orderDate[2]}-${orderDate[1]}-${orderDate[0]}`);
      orderDate = orderDate.toISOString()

      return orderDate >= _debut && orderDate <= _fin;
    });
    this.filteredDatasource()
  }

  filteredDatasource = () => {
    this.datasource = this.datasource.filter(item => item.orderType === "Priorité").concat(
      this.datasource.filter(item => item.orderType !== "Priorité")
    );
  }

}
