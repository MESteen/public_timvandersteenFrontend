import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpService {

  apiUrl: string;

  constructor(private httpclient: HttpClient, private zone: NgZone, ) {
    this.apiUrl = 'localhost:0000';
  }

  get<T>(path: string): Observable<T> {
    return this.httpclient.get<T>(this.apiUrl + path);
  }

  getWithAuth<T>(path: string): Observable<T> {
    const httpOptions = HttpService.buildAuthOptions();
    return this.httpclient.get<T>(this.apiUrl + path, httpOptions);
  }

  getWithParams<T>(path: string, params: HttpParams): Observable<T> {
    const httpOptions = HttpService.buildWithParams(params);
    return this.httpclient.get<T>(this.apiUrl + path,  httpOptions);
  }

  postJSON(path: string, data: string): Observable<any> {
    const httpOptions = HttpService.buildAuthOptions();
    return this.httpclient.post(this.apiUrl + path, data, httpOptions);
  }

  putJSON(path: string, data: string): Observable<any> {
    const httpOptions = HttpService.buildAuthOptions();
    return this.httpclient.put(this.apiUrl + path, data, httpOptions);
  }

  delete(path: string): Observable<any> {
    const httpOptions = HttpService.buildAuthOptions();
    return this.httpclient.delete(this.apiUrl + path, httpOptions);
  }

  private static buildAuthOptions() {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      Authorization: [HttpService.buildAuthHeader()]
    });

    return {
      headers: head,
    };
  }

  private static buildAuthHeader(): string {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    if (user !== null) {
      return `Bearer ${user.token}`;
    }
    return '';
  }

  private static buildWithParams(params: HttpParams): {headers: HttpHeaders, params?: HttpParams} {
    const head = new HttpHeaders({
      Authorization: HttpService.buildAuthHeader(),
      'Content-Type': 'application/json'
    });

    return {
      headers: head,
      params: params,
    };
  }
}
