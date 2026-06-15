import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string): Observable<any> {
    
    console.log('API Call');
    console.log(email);
    console.log(password);

    return of({
      success: true,
      token: 'fake-jwt-token',
    });
  }
}
