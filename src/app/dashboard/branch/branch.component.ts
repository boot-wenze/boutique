import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SecureStorageService } from 'src/app/services/secure-storage';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent {
  data !: any
  user !: any
  quartier = " "
  paramsData !: any

  constructor(
    private api: ApiService,
    private params: ActivatedRoute,
  ) {

  }

  ngOnInit(){

    const params = this.params.snapshot.queryParams

    this.paramsData = params['id']

    const data = this.api.getInfo()
    this.user = data.user





  }

}
