import { ApiService } from './../services/api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('exploitation') exploitation !: ElementRef
  @ViewChild('cgv') cgv !: ElementRef
  @ViewChild('rib') rib !: ElementRef

  isLoading: boolean = false
  email : any = ''
  phone: any = ''
  swal: boolean = false
  name: string = ""
  type: string = ""
  category: string = ""
  immatriculation: string = ""

  // data !: any
  exploitationFile: string = ''
  cgvFile: string = ''
  ribFile: string = ''


  constructor(
    private _router: ActivatedRoute,
    private route: Router,
    private api: ApiService
  ) { }

  ngOnInit() {

  }

  openFile(value: string) {
    if (value === 'exploitation') {
      this.exploitation.nativeElement.click()
    } else if (value === 'cgv') {
      this.cgv.nativeElement.click()
    } else if (value === 'rib') {
      this.rib.nativeElement.click()
    }
  }

  fileElement(event: any, value: string) {
    if (value === 'exploitation') {
      this.exploitationFile = event.target.files[0].name
    } else if (value === 'cgv') {
      this.cgvFile = event.target.files[0].name
    } else if (value === 'rib') {
      this.ribFile = event.target.files[0].name
    }
  }

  submitFiles() {
    this.isLoading = true

    const data = {
      name: this.name,
      group: this.type,
      category: this.category,
      immatriculation: this.immatriculation,
      mail: this.email,
      phone : this.phone
    }

    this.api._post('inscription', data)
    .subscribe((res: any) => {
      this.isLoading = false
      if (res.succeed) {
        Swal.fire({
          icon: 'success',
          text: 'Votre demande a été envoyé, nous reviendrons vers vous dans les heures qui suivent.',
          confirmButtonColor: "black"
        }).then(result => {
          if (result.isConfirmed) {
            this.route.navigate(['/'])
          }
        })

      } else {

        Swal.fire({
          icon: 'error',
          text: 'Cet E-mail ou le numéro de téléphone est déjà associé à un compte',
          confirmButtonColor: "black"
        }).then(result => {
          if (result.isConfirmed) {

            this.swal = false
          }
        })
      }
    })
    // if (this.exploitationFile.length >= 1) {


    //   var peb = this.exploitation.nativeElement.files[0]
    //   var _cgv = this.cgv.nativeElement.files[0]
    //   var _rib = this.rib.nativeElement.files[0]

    //   var formData = new FormData()
    //   formData.append('mail', this.email)
    //   formData.append('phone', this.phone)
    //   formData.append('preuve_exploitation_boutique', peb)
    //   formData.append('conditions_generales_de_vente', _cgv)
    //   formData.append('rib', _rib)

    //   this.api._post('boutiqueDemande', formData)
    //     .subscribe((res: any) => {
    //       // console.log(res);

    //       this.isLoading = false
    //       this.swal = true

    //       if (res.succeed) {
    //         Swal.fire({
    //           icon: 'success',
    //           text: 'Vos documents ont été envoyé, nous reviendrons vers vous dans les heures qui suivent.',
    //           confirmButtonColor: "black"
    //         }).then(result => {
    //           if (result.isConfirmed) {
    //             this.route.navigate(['/'])
    //           }
    //         })


    //       } else {

    //         Swal.fire({
    //           icon: 'error',
    //           text: 'Cet E-mail ou le numéro de téléphone est déjà associé à un compte',
    //           confirmButtonColor: "black"
    //         }).then(result => {
    //           if (result.isConfirmed) {

    //             this.swal = false
    //           }
    //         })
    //       }

    //     })


    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'La preuve d\'exploitation de la boutique est requise',
    //     confirmButtonColor: "black"
    //   }).then(result => {
    //     if (result.isConfirmed) {

    //       this.swal = false
    //     }
    //   })
    // }
  }

}
