import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SecureStorageService } from 'src/app/services/secure-storage';

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
  datasource: any[] = [
    {
      id: 'Zzt(é_vzGRZvbzt(z',
      price: 70,
      currency: "$",
      name: 'Nike',
      category: "Chaussure",
      stock: 45,
      sold: 23,
      photos: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/39c54a4a-bcff-4aaf-b599-3cd07b8a0a05/custom-nike-dunk-high-by-you-shoes.png",
        "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
        "https://plughub-au.com/cdn/shop/files/nike-dunk-high-game-royal-gs-women-s-33550773190846.jpg?v=1685059221&width=1632"
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Est, aut.Nihil culpa dolorem ullam, dolore totam beatae accusantium quod laudantium minus, quasi voluptate molestiae est laborum vitae veniam distinctio delectus?\
        Nobis quibusdam iste rem cupiditate distinctio hic, deserunt dignissimos, animi maxime sed minima, ex tempore. Veniam voluptatem veritatis aspernatur magnam dolores quas sit eaque! Fugit autem maxime enim nulla numquam.\
        Assumenda, voluptas consectetur omnis porro ipsum repellat beatae in velit, natus impedit nobis nisi optio quos a temporibus quam alias eum qui tenetur repudiandae nostrum deserunt aspernatur consequuntur laborum.Facere"
    },
    {
      id: 'Zzt(é_vzGRZvbztz',
      price: 85,
      currency: "$",
      name: 'CATTURA',
      category: "Chemise",
      stock: 50,
      description: '',
      sold: 15,
      photos: [
        "https://www.a-lafont.com/wp-content/uploads/2022/08/CATTURA_1-5P0086588_V1-1.jpg",
        "https://pullazus-4c63.kxcdn.com/root/PM/tabImages/PF%20Concept_38162.png"
      ]
    },
    {
      id: 'Zzt(é_vzGZvbzt(z',
      price: 150,
      currency: "$",
      name: 'The North Face',
      category: "Veste",
      stock: 100,
      description: '',
      sold: 34,
      photos: [
        "https://images.thenorthface.com/is/image/TheNorthFaceEU/4QYZ_N14_hero?$262x306$",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-KRs7J9fLpZllOs8c72-QJN7-5ltIndZUjXzMSThclmaSDDt4k56m_bItGRRWz0niAE&usqp=CAU",
      ]
    },
    {
      id: 'Zzt(é_vGRZvbzt(z',
      price: 50,
      currency: "$",
      name: 'Sweats Nike',
      category: "Veste",
      stock: 64,
      description: '',
      sold: 2,
      photos: [
        "https://boutique.stadetoulousain.fr/6454-large_default/veste-regular-homme-rain-22-23-stade-toulousain.jpg",
        "https://boutique.stadetoulousain.fr/10180-home_default/sweat-hoodie-homme-training-23-24-stade-toulousain.jpg",
      ]
    },
    {
      id: 'Zzt(_vzGRZvbzt(z',
      price: 35,
      currency: "$",
      name: 'Pantalon cargo',
      category: "Pantalon",
      stock: 10,
      description: '',
      sold: 5,
      photos: [
        "https://urbansapes.fr/media/catalog/product/cache/e045e075335366cdd0f51634113f1b5f/p/a/pantalon_cargo_pour_homme_avec_chevilles_lastiqu_es_et_poches_c_t_s-sw19649_1_.jpg",
        "https://ae01.alicdn.com/kf/H836da5cd7a1d4d7bb54045c9c124229dD.jpg_640x640Q90.jpg_.webp",
      ]
    },
    {
      id: 'Zz(é_vzGRZvbzt(z',
      price: 45,
      currency: "$",
      name: 'Pantalon large coton',
      category: "Pantalon",
      stock: 25,
      description: '',
      sold: 23,
      photos: [
        "https://urbansapes.fr/pub/media/catalog/product/p/a/pantalon-large-en-coton-pour-homme-avec-multi-poches-sw19170_1_.jpg",
        "https://urbansapes.fr/media/catalog/product/cache/e045e075335366cdd0f51634113f1b5f/p/a/pantalon-large-en-coton-pour-homme-avec-multi-poches-sw19170_2_.jpg",
        "https://m.media-amazon.com/images/I/61qCRXWTkyL._AC_UF1000,1000_QL80_.jpg"
      ]
    },
    {
      id: 'Zzté_vzGRZvbzt(z',
      price: 42,
      currency: "$",
      name: 'Sandale',
      category: "Sandale",
      stock: 67,
      description: '',
      sold: 61,
      photos: [
        "https://www.okumak.fr/wp-content/uploads/2022/05/sandale-385ukf-1.jpg",
        "https://media.lexception.com/img/products/nomadicstateofmind/33988257982-01BG-nomadicstateofmind-sandaleromano-01-0980-1024.jpg",
      ]
    },
    {
      id: 'Zst(é_vzGRZvbzt(z',
      price: 60,
      currency: "$",
      name: 'BIRKENSTOCK Milano',
      category: "Sandale",
      stock: 35,
      description: '',
      sold: 29,
      photos: [
        "https://www.c-confort.com/60842-large_default/milano.jpg",
        "https://www.la-botte.com/PHOTOS/Birkenstock/MILANO_BIRKO_MOCCA_HD_P.jpg",
        "https://photos6.spartoo.com/photos/145/14591586/14591586_350_B.jpg"
      ]
    },
  ]

  myImage: any
  activeImage: any
  search: any

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
    this.categorie.unshift("Tous")
    // console.log(this.user);
    this.active = "Tous"

    this.data = this.datasource

    this.activeProduct = this.data[0].id
    this.editProduct(this.activeProduct)

    const params = this.params.snapshot.queryParams

    this.link = this.user.branch.filter((e: any) =>
      e.managed_by === params['id'] && e.quartier === params['emplacement'] &&
      e.address.avenue === params['avenue'] && e.address.numero === parseInt(params['n_'])
    )[0]
  }

  filterProduct = (element: any) => {
    this.active = element
    if (element == "Tous") {
      this.data = this.datasource
      this.activeProduct = this.data[0].id
      this.editProduct(this.activeProduct)
    } else {
      this.data = this.datasource.filter(e => e.category === element)
      this.activeProduct = this.data[0].id
      this.editProduct(this.activeProduct)
    }
  }

  editProduct = (id: any) => {
    this.activeProduct = id
    this.product = this.data.find(item => item.id === id)
    this.myImage = this.product.photos[0]
    this.changeImage(this.myImage)
  }

  changeImage = (id: any) => {
    this.myImage = id
    this.activeImage = id
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
    }

  }


}
