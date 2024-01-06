import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SecureStorageService } from 'src/app/services/secure-storage';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent {
  data !: any
  user !: any

  constructor(
    private secureStorage: SecureStorageService,
    private api: ApiService,
    private params: ActivatedRoute
  ) {

  }

  ngOnInit(){
    const data = this.api.getInfo()

    const params = this.params.snapshot.queryParams



    this.data = data.branch.filter((e: any) =>
      e.managed_by === params['id'] && e.quartier === params['emplacement'] &&
      e.address.avenue === params['avenue'] && e.address.numero === parseInt(params['n_'])
    )
    this.data = this.data[0]
    this.user = data.user

  }

}
