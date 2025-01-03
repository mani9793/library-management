import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  addBook(id: number, title: string, author_id: number): void {
    const newBook = { id, title, author_id };
    this.apiService.addBook(newBook).subscribe(book => {
      this.books.push(book);
    });
  }
}