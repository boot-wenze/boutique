import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { SecureStorageService } from '../services/secure-storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('navbar') navbar!: ElementRef;
  screenYValue: number = window.scrollY;
  connect = false;

  isLoading = false;
  isLocalStorage = false;

  identifiant: string = '';
  password: string = '';

  subscription = [
    "basique",
    "standard",
    "avancée",
    "business",
  ]
  subs = [
    ["Branche Principale incluse", "Frais Logistique de Livraison à 5$"],
    [
      "Branche Principale incluse",
      "Frais Logistiues Offerts",
      "Possibilité d'Ajouter 2 Filiales Supplémentaires"
    ],
    [
      "Branche Principale incluse",
      "Frais Logistiues Offerts",
      "Extension jusqu'à 5 Filiales Incluse",
      "Suivi Visuel des Transactions Entrantes et Sortantes"
    ],
    [
      "Branche Principale incluse",
      "Frais Logistiues Offerts",
      "Création illimité des filiales",
      "Suivi Visuel des Transactions Entrantes et Sortantes",
      "Gestion Complète des Retours de Colis"
    ],
  ]
  prices = [ 10.99, 20.99, 50.99, 100.99]


  constructor(
    private api: ApiService,
    private securestorage: SecureStorageService,
    private router: Router,
    private _location: Location,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.isLoading = true
    setTimeout(() => this.isLoading = false, 2500)
    this.isLocalStorage = this.securestorage.hasOwnProperty('OAuthBT')
    // console.log(this.isLocalStorage);
    // this.api._get('boutiqueDemande')
    // .subscribe((res : any)=> console.log(res))
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.screenYValue = window.scrollY;

    if (this.screenYValue >= 145.35) {
      this.navbar.nativeElement.style.background =
        'linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))';
    } else {
      this.navbar.nativeElement.style.background = '#f2f2f2';
    }
  }

  loginForm() {
    this.connect = !this.connect;
  }

  submit() {
    const data = {
      identifiant: this.identifiant,
      password: this.password,
    };

    this.api._post('connexion', data).subscribe((res: any) => {
      // console.log(res);
      if (res.succeed) {
        this.securestorage.setItem('OAuthBT', JSON.stringify(res.data));
        this.router.navigate(['dashboard']);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Identifiant ou Mot de passe incorrect',
        });
      }
    });
  }

  scrollId(elementId: string): void {
    const element = this.el.nativeElement.ownerDocument.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

}
