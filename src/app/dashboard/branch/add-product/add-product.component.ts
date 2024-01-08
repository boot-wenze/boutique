import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SecureStorageService } from 'src/app/services/secure-storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class AddProductComponent {

  @ViewChild("file1") file1 !: ElementRef
  @ViewChild("file2") file2 !: ElementRef
  @ViewChild("file3") file3 !: ElementRef
  user: any
  categorie: any
  pic1: any = "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"
  pic2: any = "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"
  pic3: any = "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"

  photos: any[] = []
  myImage: any
  activeImage: any

  name : any
  size : any
  size1 : any
  size2 : any
  price : any
  currency : any = "USD"
  description : any
  discount : any = false
  category: any = ""
  percent = 0
  checkbox: boolean = false
  sizeHolder: any[] = [40, 41, 42]

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

    this.defaultPic()
    // console.log(this.user);


    // this.data = this.datasource


    // this.activeProduct = this.data[0].id
    // this.editProduct(this.activeProduct)

    // const params = this.params.snapshot.queryParams

    // this.link = this.user.branch.filter((e: any) =>
    //   e.managed_by === params['id'] && e.quartier === params['emplacement'] &&
    //   e.address.avenue === params['avenue'] && e.address.numero === parseInt(params['n_'])
    // )[0]
  }

  myPhoto = (value: string) => {
    if (value === "file1") {
      this.file1.nativeElement.click()
    } else if (value === "file2") {
      this.file2.nativeElement.click()
    } else {
      this.file3.nativeElement.click()
    }
  }
  onChangePic = (value: string) => {
    if (value === "file1") {
      this.pic1 = URL.createObjectURL(this.file1.nativeElement.files[0])
      this.photos[0] = this.pic1
    } else if (value === "file2") {
      this.pic2 = URL.createObjectURL(this.file2.nativeElement.files[0])
      this.photos[1] = this.pic2
    } else {
      this.pic3 = URL.createObjectURL(this.file3.nativeElement.files[0])
      this.photos[2] = this.pic3
    }

    this.defaultPic()

  }


  changeImage = (id: any) => {
    this.myImage = id
    this.activeImage = id
  }

  defaultPic = () => {
    this.myImage = this.photos[0]
    this.activeImage = this.myImage
  }

  onSubmitProduct = () => {

    if (!this.pic1.toString().startsWith("https://icon-library.com/") &&
      !this.pic2.toString().startsWith("https://icon-library.com/") &&
      !this.pic3.toString().startsWith("https://icon-library.com/")
    ) {

      const result = this.discount === true ? this.percent.toString() : "0"

      const data = new FormData()

      data.append('name', this.name)
      data.append('category', this.category)
      data.append('description', this.description)
      data.append('size', this.size)
      data.append('size1', this.size1)
      data.append('size2', this.size2)
      data.append('price', this.price)
      data.append('currency', this.currency)
      data.append('discount',  this.discount === true ? 'Oui' : 'No' )
      data.append('discount_percentage', result)
      data.append('photo1', this.file1.nativeElement.files[0])
      data.append('photo2', this.file2.nativeElement.files[0])
      data.append('photo3', this.file3.nativeElement.files[0])

      this.api.post('add_product', data)
      .subscribe((res: any) => console.log(res))
    } else {
      Swal.fire({
        title: "Fichier manquant !",
        icon: 'warning',
        text: "Vous pouvez téléverser qu'à partir de 3 fichiers"
      })
    }


  }

}
