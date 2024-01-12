import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { ApiService } from '../services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isLoading: boolean = false

  constructor(
    private websocketService: WebsocketService,
    private client : ApiService
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    setTimeout(()=> this.isLoading = false, 200)
    // console.log(
    //   this.client.getInfo()
    // );
    const data = this.client.getInfo()


    this.websocketService.connect(`ws://${environment.ws_url}ws/item/${data.branch[0].managed_by}`);

    this.websocketService.getMessages().subscribe((message) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: message.message
      });

    });
  }

}
