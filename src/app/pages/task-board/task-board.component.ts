import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  todo = [];
  inProgress = [];
  done = [];
  constructor() { }

  ngOnInit(): void {
  }

}
