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
  persons;
  personsSubcription: Subscription;

  constructor(private http: HttpClient, private service: GroupService) { }

  ngOnInit() {
    this.personsSubcription = this.service.getPersons().subscribe(
      (response: Friend[]) => this.persons = response
    );
  }

  ngOnDestroy() {
    this.personsSubcription.unsubscribe();
  }


}
