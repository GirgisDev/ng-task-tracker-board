import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  @Input("task") task = {};
  @Output("closeDetails") closeDetails: EventEmitter<any> = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

  updateTask(desc) {
    console.log(desc)
  }

  close() {
    this.closeDetails.emit();
  }

}
