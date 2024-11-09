import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { UserState } from '../user/store/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpointUrl = 'auth';

  constructor(private httpService: HttpService) {}

  signup(email: string, password: string): Observable<UserState> {
    return this.httpService.post<
      { email: string; password: string },
      UserState
    >(`${this.endpointUrl}/signup`, { email, password });
  }

  login(email: string, password: string): Observable<UserState> {
    return this.httpService.post<
      { email: string; password: string },
      UserState
    >(`${this.endpointUrl}/login`, { email, password });
  }
}
