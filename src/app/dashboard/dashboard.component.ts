import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isLoading: boolean = false

  constructor() {

  }

  ngOnInit() {
    this.isLoading = true
    setTimeout(()=> this.isLoading = false, 200)
  }

}
