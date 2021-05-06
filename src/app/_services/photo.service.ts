import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Photo } from '@app/_models';
import { PaginatedResponse } from '@app/_rest/paginated.response';
import { Observable, throwError } from 'rxjs';
import { SingleObjectResponse } from '@app/_rest/singleobject.response';
import { catchError } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/photos`;

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PaginatedResponse<Photo>> {
    return this.http.get<PaginatedResponse<Photo>>(baseUrl);
  }

  getById(id: string): Observable<SingleObjectResponse<Photo>> {
    return this.http.get<SingleObjectResponse<Photo>>(`${baseUrl}/${id}`);
  }

  create(params: any): Observable<any> {
    return this.http
      .post(baseUrl, params)
      .pipe(catchError((err) => this.handleError(err)));
  }
  private handleError(error: any) {
    return throwError(error);
  }

  update(id: number, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
