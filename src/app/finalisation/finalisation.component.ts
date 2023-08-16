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

  activity: string = ''
  nom : string = ''
  mdp : string = ''
  cfn: string = ''
  disabled = true

  constructor(
    private api: ApiService,
    private router : Router,
    private _params : ActivatedRoute,
    private securestorage : SecureStorageService
  ) { }

  ngOnInit() {

    this.isLoading = true

    if (Object.keys(this._params.snapshot.queryParams).length < 2) {
      this.isLoading = false
      this.swal = true

      Swal.fire({
        icon: 'error',
        text : 'Pas non trouvée'
      }).then(result => {
        if(result.isConfirmed)
        this.router.navigate(['/'])
      })
    } else {

      this.is_auth = this._params.snapshot.queryParams['id_auth']
      this.is_confirmed = this._params.snapshot.queryParams['is_confirmed']

      this.api._get(`register?is_auth=${this.is_auth}&approuved=${this.is_confirmed}`)
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

  submit() {
    if (this.mdp !== this.cfn) {
      Swal.fire({
        icon: 'error',
        text : "Mot de passe non identique"
      })
    } else {

      var data = {
        categorie: this.activity,
        password: this.mdp,
        name: this.nom,
        is_confirm: true,
        slugId : this.is_auth
      }

      Swal.fire(
        {
          text : "êtes-vous sûr de procéder à l'étape suivante ?"
        }
        ).then(dab => {
          if (dab.isConfirmed) {
            this.isLoading = true
            this.api._post('register', data)
            .subscribe((res: any) => {
              this.isLoading = false
              if (res.succeed) {
                this.securestorage.setItem('OAuthBT', res.data)
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
