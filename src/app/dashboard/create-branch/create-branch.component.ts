import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(
    private client: ApiService,
    private params: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.user = this.client.getInfo()
    // console.log(this.user);

    if (this.user.permission.type !== "ADMIN") {
      this.router.navigate(['/dashboard'])
    }

    // const params = this.params.snapshot.queryParams
    // this.link = this.user.branch.filter((e: any) =>
    //   e.managed_by === params['id'] && e.quartier === params['emplacement'] &&
    //   e.address.avenue === params['avenue'] && e.address.numero === parseInt(params['n_'])
    // )[0]
  }

}
