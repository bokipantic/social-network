import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Friend } from '../friend-model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  persons: Friend[];
  personsSubcription: Subscription;

  constructor(private http: HttpClient, private groupService: GroupService) { }

  ngOnInit() {
    this.personsSubcription = this.groupService.getPersons().subscribe(
      (response: Friend[]) => this.persons = response
    );
  }

  ngOnDestroy() {
    this.personsSubcription.unsubscribe();
  }


}
