import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent {

  link !: any

  user !: any

  phone: string = ""
  mail: string = ""
  city: string = ""
  commune: string = ""
  quartier: string = ""
  numero!: number
  avenue: string = ""
  managed_by = ""
  isLoading = false
  data : any

  constructor(
    private client: ApiService,
    private params: ActivatedRoute,
    private router: Router,
    private websocketService: WebsocketService,
  ) {

  }

  ngOnInit(): void {

    this.user = this.client.getInfo()
    // console.log(this.user);

    if (this.user.permission.type !== "ADMIN") {
      this.router.navigate(['/dashboard'])
    }

    this.client.get('user')
    .subscribe((res: any) => res)


    this.websocketService.connect(
      `ws://${environment.ws_url}ws/branchs/${this.user.bness.b_id}`
    );

    this.websocketService.getMessages()
    .subscribe((res: any) => {
      this.data = res

    })
    // const params = this.params.snapshot.queryParams
    // this.link = this.user.branch.filter((e: any) =>
    //   e.managed_by === params['id'] && e.quartier === params['emplacement'] &&
    //   e.address.avenue === params['avenue'] && e.address.numero === parseInt(params['n_'])
    // )[0]
  }

  onSubmit = () => {

    Swal.fire({
      text: "êtes-vous sûr de cette action ?",
      icon: "info"
    }).then((info: any) => {

      Swal.fire({
        text: "Création de la filiale en cours...",
        didOpen: () => {
          Swal.showLoading()
        }
      })

      const form = {
        b_id: this.user.bness.b_id,
        managed_by: this.managed_by,
        phone: this.phone,
        mail: this.mail,
        city: this.city,
        commune: this.commune,
        quartier: this.quartier,
        address: {
          avenue: this.avenue,
          numero: this.numero
        }
      }

      this.client.post('branch', form)
      .subscribe((res: any) => {
        Swal.close()
        Swal.fire({
          text: "Cette filiale apparaîtra dans votre espace dans minutes."
        }).then((resp: any) => {
          if (resp.isConfirmed) {
            this.router.navigate(['/dashboard'])
          }
        })
      })

    })

  }

}
