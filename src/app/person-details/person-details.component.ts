import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';
import { Friend } from '../friend-model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  userId: number;
  persons: Friend[];
  userSelected: Friend;
  friendsOfFriends: number[];
  friendSub: Subscription;

  constructor(private route: ActivatedRoute, private service: GroupService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.userId = +param.id;

        this.friendSub = this.service.getPersons().subscribe(
          (response: Friend[]) => {
            this.persons = response;
            this.userSelected = this.persons[this.userId - 1];

            this.friendsOfFriends = [];
            for (let id of this.userSelected.friends) {
              const friend = this.persons.find(p => p.id === id);
              friend.friends.forEach(element => {
                if (this.friendsOfFriends.indexOf(element) === -1 && this.userSelected.friends.indexOf(element) === -1) {
                  this.friendsOfFriends.push(element);
                }
              });
            }
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.friendSub.unsubscribe();
  }

  getFriendsName(id: number): string {
    const friend = this.persons.find(p => p.id === id);
    return (friend.firstName + ' ' + friend.surname);
  }

}
