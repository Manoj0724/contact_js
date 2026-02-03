import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactsApiResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  contacts: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private API_URL = '/api/contacts/paginate';

  constructor(private http: HttpClient) {}
getContacts(
  page: number,
  limit: number,
  query: string = '',
  sortBy: string = 'firstName',
  sortOrder: 'asc' | 'desc' = 'asc'
) {
  const params: any = {
    page,
    limit,
    sortBy,
    sortOrder
  };

  if (query && query.trim()) {
    params.q = query.trim();
  }

  return this.http.get<any>('/api/contacts/paginate', { params });
}


}
