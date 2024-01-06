import { SecureStorageService } from './../services/secure-storage';
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finalisation',
  templateUrl: './finalisation.component.html',
  styleUrls: ['./finalisation.component.scss']
})
export class FinalisationComponent {

  is_auth : string = ''
  is_confirmed !: boolean
  isLoading = false
  swal !: boolean


  cfn: string = ''
  disabled = true

  first_name: string = ""
  last_name: string = ""
  surname: string = ""
  permission: string = "ADMIN"
  password: string = ""
  email: string = ""

  phone: string = ""
  mail: string = ""
  city: string = ""
  commune: string = ""
  quartier: string = ""
  numero!: number
  avenue: string = ""
  is_headquarter: boolean = false

  constructor(
    private api: ApiService,
    private router : Router,
    private _params : ActivatedRoute,
    private securestorage : SecureStorageService
  ) { }

  ngOnInit() {

    this.isLoading = true

    if (Object.keys(this._params.snapshot.queryParams).length !== 2) {
      this.isLoading = false
      this.swal = true

      Swal.fire({
        icon: 'error',
        text : 'Page non trouvée'
      }).then(result => {
        if(result.isConfirmed)
        this.router.navigate(['/'])
      })
    } else {

      this.is_auth = this._params.snapshot.queryParams['id_auth']
      this.is_confirmed = this._params.snapshot.queryParams['slug_id']

      this.api._get(`inscription?is_auth=${this.is_auth}&approuved=${this.is_confirmed}`)
      .subscribe((res: any) => {

        if (res.succeed) {
          this.isLoading = false
        } else {
          this.isLoading = false
          this.swal = true

          Swal.fire({
            icon: 'info',
            text : 'Votre demande n\'est pas valide ou a déjà été validée précédemment'
          }).then(result => {
            if(result.isConfirmed)
            this.router.navigate(['/'])
          })
        }


      })
    }




  }

  submit = () =>{
    if (this.password !== this.cfn) {
      Swal.fire({
        icon: 'error',
        text : "Mot de passe non identique"
      })
    } else {

      const user = {
        first_name: this.first_name,
        last_name: this.last_name,
        surname: this.surname,
        permission: this.permission,
        password: this.password,
        email: this.email,
      }

      const branch = {
        phone: this.phone,
        mail: this.mail,
        city: this.city,
        commune: this.commune,
        quartier: this.quartier,
        numero: this.numero,
        avenue: this.avenue,
        is_headquarter: this.is_headquarter,
      }

      var data = {
        user: user,
        branch: branch,
        business: {
          is_valid: true,
          b_id : this.is_auth
        }
      }

      Swal.fire(
        {
          text : "êtes-vous sûr des informations entrées?"
        }
        ).then(dab => {
          if (dab.isConfirmed) {
            this.isLoading = true
            this.api._put('inscription', data)
            .subscribe((res: any) => {
              this.isLoading = false
              if (res.succeed) {
                this.securestorage.setItem('OAuthBT', JSON.stringify(res.data))
                Swal.fire({
                  icon: 'success',
                  text : 'Votre espace a été bien activé'
                }).then(result => {
                  if (result.isConfirmed) {
                    this.router.navigate(['dashboard'])
                  }
                })

              }

            })

        }
      })


    }
  }
}
