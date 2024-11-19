import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = environment.apiUrl;
  private config = { withCredentials: true };

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, this.config);
  }

  post<T, ResponseType>(endpoint: string, data: T): Observable<ResponseType> {
    return this.http.post<ResponseType>(
      `${this.apiUrl}/${endpoint}`,
      data,
      this.config
    );
  }

  put<T, ResponseType>(endpoint: string, data: T): Observable<ResponseType> {
    return this.http.put<ResponseType>(
      `${this.apiUrl}/${endpoint}`,
      data,
      this.config
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, this.config);
  }
}
