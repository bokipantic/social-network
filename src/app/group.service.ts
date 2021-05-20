import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get('https://friends-f43c7-default-rtdb.firebaseio.com/allFriends.json');
  }

}