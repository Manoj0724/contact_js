import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

private API_URL = 'http://127.0.0.1:5000/api/contacts/paginate';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any> {
    return this.http.get<any>(this.API_URL + '?page=1&limit=3');
  }
}
