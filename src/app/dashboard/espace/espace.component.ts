import { SecureStorageService } from 'src/app/services/secure-storage';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.scss']
})
export class EspaceComponent {

  data !: any
  user !: any
  has_access !: any

  subscription = [
    "basique",
    "standard",
    "avancée",
    "business",
  ]
  subs = [
    [
      "Branche Principale incluse",
      "Frais Logistique de 5$ à chaque Livraison"
    ],
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
    private websocketService: WebsocketService,
    private secureStorage : SecureStorageService
  ) {

  }

  ngOnInit(){
    this.user = this.api.getInfo()


    const ids = {
      b_id : this.user.bness.b_id,
      user_id : this.user.user.user_id,
    }

    this.websocketService.connect(
      `ws://${environment.ws_url}ws/getAllBranchs/${this.user.bness.b_id}`
    );

    this.websocketService.sendMessage(JSON.stringify(ids))
    this.websocketService.getMessages()
    .subscribe((res: any) => {
      this.data = res
      // console.log(this.data)
      this.secureStorage.setItem("has_access", JSON.stringify(this.data.has_access))

      var access = this.secureStorage.getItem("has_access")

      this.has_access = JSON.parse(access).has_access

      // console.log(has_access);

    })

  }

  logOut = () => {
    this.secureStorage.clear()
    window.location.reload()
  }

}
