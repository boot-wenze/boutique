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

  constructor(
    private api: ApiService,
    private websocketService: WebsocketService
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

    })

  }

}
