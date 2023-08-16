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

    setItem(key: string, value: any): void {
        localStorage.setItem(key, this.encryt(value))
    }

    getItem(key: string): any {
        const valueToDecrypt = localStorage.getItem(key)
        return this.decrypt(valueToDecrypt)
    }

    hasOwnProperty(key: string): boolean {
        return localStorage.hasOwnProperty(key);
    }

    removeItem(key: string): any {
        const valueToDecrypt = localStorage.removeItem(key)
        return this.decrypt(valueToDecrypt)
    }

    clear() {
        localStorage.clear();
    }
}
