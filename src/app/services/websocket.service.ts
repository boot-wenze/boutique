// src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

    private socket!: WebSocketSubject<any>;
    private messagesSubject: Subject<any> = new Subject<any>();

    public connect(url: string): void {
        this.socket = webSocket(url);

        this.socket.asObservable().subscribe(
        (message) => {
            this.messagesSubject.next(message);
        },
        (error) => console.error(error),
        () => console.warn('WebSocket closed!')
        );
    }

    public sendMessage(message: any): void {
        this.socket.next(message);
    }

    public getMessages(): Observable<any> {
        return this.messagesSubject.asObservable();
    }
}
