import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@app/_models';
import { PaginatedResponse, SingleObjectResponse } from '@app/_rest';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}/comments`;

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PaginatedResponse<Comment>> {
    return this.http.get<PaginatedResponse<Comment>>(`${baseUrl}`);
  }

  getAllByTopicId(id: number): Observable<PaginatedResponse<Comment>> {
    return this.http.get<PaginatedResponse<Comment>>(
      `${baseUrl}?topicid=` + id
    );
  }

  getById(id: number): Observable<SingleObjectResponse<Comment>> {
    return this.http.get<SingleObjectResponse<Comment>>(`${baseUrl}/${id}`);
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
