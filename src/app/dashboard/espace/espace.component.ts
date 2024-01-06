import { SecureStorageService } from 'src/app/services/secure-storage';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.scss']
})
export class EspaceComponent {

  data !: any

  constructor(
    private secureStorage: SecureStorageService,
    private api: ApiService
  ) {

  }

  ngOnInit(){
    this.data = this.api.getInfo()
    // console.log(this.data);

  }

}
