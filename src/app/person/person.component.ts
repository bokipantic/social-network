import { Component, Input, OnInit } from '@angular/core';

import { Friend } from '../friend-model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() member: Friend;
  @Input() friends: Friend[];

  constructor() { }

  ngOnInit(): void {
  }

  getFriendsName(id: number): string {
    const friend = this.friends.find(f => f.id === id);
    return (friend.firstName + ' ' + friend.surname);
  }

}
