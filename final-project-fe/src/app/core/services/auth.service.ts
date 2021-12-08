import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;
  public currentUser: User;

  constructor(private http: HttpClient) { }

  public login(model: any): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}`, model)
      .pipe(
        map(
          (response: any) => {
            const userToken = response;
            if (userToken) {
              localStorage.setItem('token', userToken.token);
              localStorage.setItem('user', JSON.stringify(userToken.user));
              this.currentUser = userToken.user;
            }
          }
        )
      );
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
