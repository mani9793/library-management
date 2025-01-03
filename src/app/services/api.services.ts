import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authors`);
  }

  addAuthor(author: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authors`, author);
  }

  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, book);
  }
}