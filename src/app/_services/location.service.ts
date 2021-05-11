import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { City } from '@app/_models';
import { PaginatedResponse, SingleObjectResponse } from '@app/_rest';
import { Observable } from 'rxjs';
import { Location } from '@app/_models/location';

const baseUrl = `${environment.apiUrl}/locations`;

@Injectable({ providedIn: 'root' })
export class LocationService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PaginatedResponse<Location>> {
        return this.http.get<PaginatedResponse<Location>>(`${baseUrl}`);
      }

      getById(id: number): Observable<SingleObjectResponse<Location>> {
        return this.http.get<SingleObjectResponse<Location>>(`${baseUrl}/${id}`);
      }

      create(params: any): Observable<any> {
        return this.http.post(baseUrl, params);
      }

      update(id: number, params: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, params);
      }

      delete(id: number) {
        return this.http.delete(`${baseUrl}/${id}`);
      }
}