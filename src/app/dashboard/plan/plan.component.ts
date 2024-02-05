import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class PlanComponent {

  data !: any

  constructor(
    private params: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.data = this.api.getInfo()

    var params = this.params.snapshot.queryParams

    console.log(params);
    // console.log(this.data.permission.type);

    if (this.data.permission.type !== "ADMIN") {
      this.router.navigate(['/dashboard/espace'])
    }

  }

}
