import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  addAuthor(id: number, name: string): void {
    const newAuthor = { id, name };
    this.apiService.addAuthor(newAuthor).subscribe(author => {
      this.authors.push(author);
    });
  }
}