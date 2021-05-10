import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '@app/_models';
import { PaginatedResponse, SingleObjectResponse } from '@app/_rest';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}/topics`;

@Injectable({ providedIn: 'root' })
export class TopicService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PaginatedResponse<Topic>> {
    return this.http.get<PaginatedResponse<Topic>>(`${baseUrl}`);
  }

  getById(id: number): Observable<SingleObjectResponse<Topic>> {
    return this.http.get<SingleObjectResponse<Topic>>(`${baseUrl}/${id}`);
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
