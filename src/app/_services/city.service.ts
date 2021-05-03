import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { City } from '@app/_models';
import { PaginatedResponse, SingleObjectResponse } from '@app/_rest';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}/cities`;

@Injectable({ providedIn: 'root' })
export class CityService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PaginatedResponse<City>> {
        return this.http.get<PaginatedResponse<City>>(`${baseUrl}`);
    
      }
    
      getById(id: number): Observable<SingleObjectResponse<City>> {
        return this.http.get<SingleObjectResponse<City>>(`${baseUrl}/${id}`);
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