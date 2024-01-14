import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SettingsComponent {

  comptes = [
    "Ajouter un collaborateur",
    "Gérer vos filiales",
    "Gérer vos collaborateurs",
    "Gérer vos données"
  ]
  first_name = ""
  last_name = ""
  surname = ""
  email = ""
  permission = ""
  can_add = false
  can_delete = false
  can_modify = false
  isLoading = false
  user: any

  data: any

  panel : string = "Gérer vos collaborateurs"
  constructor(
    private api: ApiService,
    private websocketService: WebsocketService,
  ) {

  }

  ngOnInit() {
    this.user = this.api.getInfo()
    // console.log(this.user)
    if (this.user.permission.type !== 'ADMIN') {
      this.panel = "Vos collaborateurs"
      this.comptes = [
        "Vos filiales",
        "Vos collaborateurs",
        "Gérer vos données"
      ]
    }

    this.onChangePanel(this.panel)
  }

  onChangePanel = (name: string) => {
    this.panel = name

    if (name == "Gérer vos collaborateurs" || name == "Vos collaborateurs") {

      this.api.get('user')
      .subscribe((res: any) => res)


      this.websocketService.connect(
        `ws://${environment.ws_url}ws/branchs/${this.user.bness.b_id}`
      );

      this.websocketService.getMessages()
      .subscribe((res: any) => {
        this.data = res
        // console.log(this.data);

      })

    }
  }

  onSubmit = () => {

    const user = {
      first_name: this.first_name,
      last_name : this.last_name,
      surname : this.surname,
      email : this.email,
      permission: this.permission,
      password : "empty-password-reset-it"
    }
    const perms = {
      can_add: this.can_add,
      can_delete : this.can_delete,
      can_modify : this.can_modify,
      type : this.permission,
    }

    const ids = {
      branch_id : this.user.bness.b_id,
      user_id : this.user.user.user_id,
    }

    const data = {
      permissions: perms,
      add_user: user,
      ids: ids
    }

    Swal.fire({
      text: "Voulez-vous ajouter " + this.first_name + " " + this.last_name + " comme " + this.permission
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.isLoading = true
        this.loading()

        this.websocketService.connect(
          `ws://${environment.ws_url}ws/add_user/${this.user.branch[0].managed_by}`
        );

        this.websocketService.sendMessage(JSON.stringify(data))

        this.websocketService.getMessages()
        .subscribe((res: any) => {
          this.permission = ""
          this.first_name = ""
          this.last_name = ""
          this.surname = ""
          this.email = ""
          this.can_add = false
          this.can_delete = false
          this.can_modify = false
          Swal.fire({
            text: res.message,
            icon: "success"
          }).then((info: any) => {
            if (info.isConfirmed) {
              Swal.close()
            }
            Swal.close()
          })

        })

      }
    })

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
}
