import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  suggestedFriends: number[];
  friendSub: Subscription;

  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit(): void {
    this.friendSub = this.route.params.pipe(
      switchMap((param: Params) => {
        this.userId = +param.id;
        return this.groupService.getPersons();
      })
    ).subscribe(
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

        this.suggestedFriends = [];
        if (this.userSelected.friends.length > 1) {
          this.persons.forEach(person => {
            if (person.friends.length > 1 && person !== this.userSelected) {
              const filteredFriends = person.friends.filter(value => this.userSelected.friends.includes(value));
              if (filteredFriends.length > 1) {
                this.suggestedFriends.push(person.id);
              }
            }
          });
        }
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