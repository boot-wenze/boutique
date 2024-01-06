import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SecureStorageService } from 'src/app/services/secure-storage';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  user: any
  categorie: any
  pic1: any = "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"
  pic2: any = "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"
  pic3: any = "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"

  photos: any[] = []
  myImage: any
  activeImage: any

  constructor(
    private secureStorage: SecureStorageService,
    private api: ApiService,
    private params: ActivatedRoute
  ) {

  }


  ngOnInit(){
    this.user = this.api.getInfo()
    this.categorie = this.user.bness.category
    this.categorie = this.categorie.split(' ')

    this.photos.push(this.pic1)
    this.photos.push(this.pic2)
    this.photos.push(this.pic3)

    this.myImage = this.photos[0]
    this.activeImage = this.myImage

    // this.data = this.datasource

    // this.activeProduct = this.data[0].id
    // this.editProduct(this.activeProduct)

    // const params = this.params.snapshot.queryParams

    // this.link = this.user.branch.filter((e: any) =>
    //   e.managed_by === params['id'] && e.quartier === params['emplacement'] &&
    //   e.address.avenue === params['avenue'] && e.address.numero === parseInt(params['n_'])
    // )[0]
  }

}
