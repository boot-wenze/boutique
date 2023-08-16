import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { SecureStorageService } from '../services/secure-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('navbar') navbar !: ElementRef
  screenYValue: number = window.scrollY;
  connect = false

  isLoading = false

  identifiant : string = ''
  password: string = ''

  constructor(
    private api: ApiService,
    private securestorage: SecureStorageService,
    private router : Router
  ){}

  ngOnInit() {

    this.isLoading = true

    setTimeout(() => this.isLoading = false, 2000)

    // this.api._get('boutiqueDemande')
    // .subscribe((res : any)=> console.log(res))

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.screenYValue = window.scrollY;

    if (this.screenYValue >= 145.35) {
      this.navbar.nativeElement.style.background = 'linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))'
    }else{
      this.navbar.nativeElement.style.background = '#f2f2f2'
    }

  }

  loginForm() {
    this.connect = !this.connect
  }

  submit() {
    const data = {
      _identifiant : this.identifiant,
      _password : this.password
    }

    this.api._post('boutique_connexion', data)
    .subscribe((res: any) => {
      // console.log(res);
      if (res.succeed) {
        this.securestorage.setItem('OAuthBT', res.data)
        this.router.navigate(['dashboard'])
      } else {
        Swal.fire({
          icon: 'error',
          text : 'Identifiant ou Mot de passe incorrect'
        })
      }
    })

  }
}
