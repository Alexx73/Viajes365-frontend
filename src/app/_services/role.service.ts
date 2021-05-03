import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Role } from '@app/_models';
import { PaginatedResponse } from '@app/_rest/paginated.response';
import { Observable } from 'rxjs';
import { SingleObjectResponse } from '@app/_rest/singleobject.response';

const baseUrl = `${environment.apiUrl}/roles`;

@Injectable({ providedIn: 'root' })
export class RoleService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PaginatedResponse<Role>> {
        return this.http.get<PaginatedResponse<Role>>(baseUrl);
    }

    getById(id: string): Observable<SingleObjectResponse<Role>> {
        return this.http.get<SingleObjectResponse<Role>>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: number, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: number) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}