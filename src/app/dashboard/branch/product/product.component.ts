import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SecureStorageService } from 'src/app/services/secure-storage';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ProductComponent {

  categorie !: any
  user !: any
  active: string = ""
  activeProduct = ""
  product!: any
  link !: any

  data: any[] = []
  datasource: any[] = []

  myImage: any
  activeImage: any
  search: any
  isLoading: boolean = false
  details : any
  disponible : any
  getBranchId: any

  accountType: any
  socket: any

  constructor(
    private websocketService: WebsocketService,
    private secureStorage: SecureStorageService,
    private api: ApiService,
    private params: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.isLoading = true

    const api = this.api.getInfo()

    this.accountType = api.bness.group


    this.loading()


    this.getBranchId = this.params.snapshot.queryParams['id']


    if (this.accountType !== "RESTAURANT") {

      this.api.get(`add_product?id=${this.getBranchId}`)
      .subscribe((res: any)=> {
        if(res.message === "added to the queue"){

          this.socket = this.websocketService.connect(`ws://${environment.ws_url}ws/items/${this.getBranchId}`);

          this.socket.subscribe((message: any) => {
            this.user = this.api.getInfo()
            // console.log(message.items);
            this.datasource = message.items
            this.categorie = this.user.bness.category
            this.categorie = this.categorie.split(' ')
            this.categorie.unshift("Tous")
            this.active = "Tous"

            this.data = this.datasource

            // console.log(this.data);


            this.removeErrors()

          })
        }
      }
      )
    } else {
      this.api.get(`add_resto_product?id=${this.getBranchId}`)
        .subscribe((res: any) => {

          if (res.message === "added to the queue") {
            this.socket = this.websocketService.connect(`ws://${environment.ws_url}ws/resto/${this.getBranchId}`);

            this.socket.subscribe((message: any) => {

              this.user = this.api.getInfo()

              this.datasource = JSON.parse(message.data)
              // console.log(this.datasource);

              this.categorie = this.user.bness.category
              this.categorie = this.categorie.split(' ')
              this.categorie.unshift("Tous")
              this.active = "Tous"

              this.data = this.datasource

              this.removeErrors()

            })
          }

      })
    }


  }

  removeErrors = () => {
    if (this.data.length < 1) {
      this.isLoading = false
      this.loading()

    } else {

      this.isLoading = false
      if (this.accountType !== "RESTAURANT") {
        this.details = this.data[0].stock[0]
        this.disponible = this.data[0].disponible[0]

        this.activeProduct = this.data[0].id
      } else {
        this.activeProduct = this.data[0].product_id
      }
      this.editProduct(this.activeProduct)
      this.loading()

    }
  }

  filterProduct = (element: any) => {
    this.active = element
    if (element == "Tous") {
      this.data = this.datasource
      this.removeErrors()
    } else {
      this.data = this.datasource.filter(e => e.category === element)
      this.removeErrors()
    }
  }

  editProduct = (id: any) => {
    this.activeProduct = id
    if (this.accountType !== "RESTAURANT") {
      this.product = this.data.find(item => item.id === id)
      this.myImage = this.product.photos[0]
    } else {
      this.product = this.data.find(item => item.product_id === id)
      this.myImage = this.product.photo
    }
    this.changeImage(this.myImage)
  }

  changeImage = (id: any, index : number = 0) => {
    this.myImage = id
    this.activeImage = id
    if (this.accountType !== "RESTAURANT") {
      this.details = this.data[0].stock[index]
      this.disponible = this.data[0].disponible[index]
    }

  }
  searchOrder = () => {

    if (this.search.length < 1) {
      this.data = this.datasource
    } else {
      this.data = this.datasource.filter(e =>
        e.name.toLowerCase().includes(this.search.toLowerCase()) ||
        e.category.toLowerCase().includes(this.search.toLowerCase()) ||
        e.id.toLowerCase().includes(this.search.toLowerCase()) ||
        e.description.toLowerCase().includes(this.search.toLowerCase())
      )
      this.removeErrors()
    }

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

  sum = (stock: any) => {
    var res = 0
    stock.forEach((element: any) => res += element.quantity)
    return res
  }

  delete = () => {

    Swal.fire({
        text: "êtes-vous sûr de vouloir supprimer cet article ?",
      }).then((res) => {
        if (res.isConfirmed) {

          this.isLoading = true
          this.loading()

          this.api.delete(`add_product?id=${this.activeProduct}`)
          .subscribe((res: any) => {
            this.isLoading = false
            this.loading()

          })

        }
      })

  }

  reduction = (percent: number, price: any) => {
    var montant: any = (percent / 100) * parseFloat(price)
    return montant.toFixed(1)
  }


}
