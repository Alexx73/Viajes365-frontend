import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Weather } from '@app/_models';
import { PaginatedResponse } from '@app/_rest/paginated.response';
import { Observable } from 'rxjs';
import { SingleObjectResponse } from '@app/_rest/singleobject.response';

const baseUrl = `${environment.apiUrl}/weathers`;

@Injectable({ providedIn: 'root' })
export class WeatherService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PaginatedResponse<Weather>> {
        return this.http.get<PaginatedResponse<Weather>>(baseUrl);
    }

    getById(id: string): Observable<SingleObjectResponse<Weather>> {
        return this.http.get<SingleObjectResponse<Weather>>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    getByCode(code: number): Observable<Weather> {

        return this.http.post<Weather>(`${baseUrl}/${code}`, {});
    }

    update(id: number, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: number) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}