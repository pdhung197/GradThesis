import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { BookingNotificationModalComponent } from '../../shared/components/booking-notification-modal/booking-notification-modal.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {
    public currentMessage = new BehaviorSubject(null);
    private baseUrl = `${environment.apiUrl}/push-notif`;

    constructor(
        private angularFireMessaging: AngularFireMessaging,
        private authService: AuthService,
        private http: HttpClient,
        private modalService: BsModalService
        ) {
        this.angularFireMessaging.messages.subscribe(
            (messaging: AngularFireMessaging) => {
                messaging.onMessage = messaging.onMessage.bind(messaging);
                messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
            }
        );
    }

    requestPermission() {
        if (this.authService.loggedIn() && this.authService.getCurrentUser().role !== 'STORE_EMP') {
            this.angularFireMessaging.requestToken.subscribe(
                (token) => {
                    this.http.post<void>(`${this.baseUrl}/token`, {
                        userId: this.authService.getCurrentUser().id,
                        token
                    }).subscribe(() => {
                        console.log(token);
                    });
                },
                (err) => {
                    console.error('Unable to get permission to notify.', err);
                }
            );
        }
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                if (this.authService.loggedIn() && this.authService.getCurrentUser().role !== 'STORE_EMP') {
                    this.modalService.show(BookingNotificationModalComponent, {});
                }
                console.log('new message received. ', payload);
                this.currentMessage.next(payload);
            });
    }
}
