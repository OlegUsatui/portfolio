import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from '@app/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Data> {
    return this.http.get<Data>(this.dataUrl);
  }
}
