import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

    encryt(str : string) {
        return window.btoa(encodeURIComponent(str));
    }

    decrypt(str : any) {
        return decodeURIComponent(window.atob(str));
    }

    setCookie(key: string, value: any): void {
        document.cookie = this.encryt(key) +"=" + this.encryt(value)
    }
    getCookie(key: string): any {
        var cookie = document.cookie.includes(`${this.encryt(key)}`)
        return cookie
    }
    removeCookie(key: string): any {
        const cookie = this.encryt(key)
        document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }

    setItem(key: string, value: any): void {
        localStorage.setItem(this.encryt(key), this.encryt(value))
    }

    getItem(key: string): any {
        const valueToDecrypt = localStorage.getItem(this.encryt(key))
        return this.decrypt(valueToDecrypt)
    }

    hasOwnProperty(key: string): boolean {
        return localStorage.hasOwnProperty(this.encryt(key));
    }

    removeItem(key: string): any {
        const valueToDecrypt = localStorage.removeItem(this.encryt(key))
        return this.decrypt(valueToDecrypt)
    }

    clear() {
        localStorage.clear();
    }
}
