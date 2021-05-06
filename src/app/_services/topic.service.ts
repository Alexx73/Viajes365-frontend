import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '@app/_models';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/topics`;

@Injectable({ providedIn: 'root' })
export class TopicService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Topic[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Topic>(`${baseUrl}/${id}`);
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
