import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chatcomment } from '@app/_models';
import { PaginatedResponse, SingleObjectResponse } from '@app/_rest';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}/chatcomments`;

@Injectable({ providedIn: 'root' })
export class ChatcommentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PaginatedResponse<Chatcomment>> {
    return this.http.get<PaginatedResponse<Chatcomment>>(`${baseUrl}`);
  }

  getAllByChatId(
    id: number,
    page: number
  ): Observable<PaginatedResponse<Chatcomment>> {
    return this.http.get<PaginatedResponse<Chatcomment>>(
      `${baseUrl}?chatid=` + id + `&pagesize=10&page=` + page
    );
  }

  getById(id: number): Observable<SingleObjectResponse<Chatcomment>> {
    return this.http.get<SingleObjectResponse<Chatcomment>>(`${baseUrl}/${id}`);
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
