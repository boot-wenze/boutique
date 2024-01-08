import { SecureStorageService } from './secure-storage';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.rootUri
  user: string = ''

  constructor(
    private http: HttpClient,
    private securestorage : SecureStorageService
  ) { }


  _get(lien : any): any | undefined {
    return this.http.get<any>(this.url + lien)
  }

  _post(lien: any, data: any): any | undefined {
    return this.http.post<any>(this.url + lien, data)
  }

  _put(lien: any, data: any): any | undefined {
    return this.http.put<any>(this.url + lien, data)
  }

  get(lien: any) : any | undefined {
    return this.http.get<any>(
      this.url + lien, this.getToken()
    )
  }

  post(lien: any, body: any): any | undefined {
    return this.http.post<any>(
      this.url + lien, body , this.getToken()
    )
  }

  put(lien: any, body: any): any | undefined {
    return this.http.put<any>(
      this.url + lien, body , this.getToken()
    )
  }

  delete(lien: any): any | undefined {
    return this.http.delete<any>(
      this.url + lien, this.getToken()
    )
  }

  getToken() : any | HttpHeaders {
    this.user = JSON.parse(this.securestorage.getItem('OAuthBT')).token.toString()

    let headers = new HttpHeaders()
      .set('Authorization', `Token ${this.user}`)

    return { headers : headers }
  }

  getInfo() {
    return JSON.parse(this.securestorage.getItem('OAuthBT'))
  }

}
