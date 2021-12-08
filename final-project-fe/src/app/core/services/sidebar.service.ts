import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root'})

export class SidebarService {
    public isMinimized = new BehaviorSubject<boolean>(false);
}
