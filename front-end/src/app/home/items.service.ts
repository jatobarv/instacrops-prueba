import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}

  async getItems() {
    return this.http.get('http://localhost:8080/items/');
  }

  async getItemById(itemId: string) {
    return this.http.get('http://localhost:8080/items/' + itemId);
  }
}
