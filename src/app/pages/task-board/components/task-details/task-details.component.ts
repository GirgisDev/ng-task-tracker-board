import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  @Input("task") task = {};
  @Output("deletedTask") deletedTask: EventEmitter<any> = new EventEmitter;
  @Output("closeDetails") closeDetails: EventEmitter<any> = new EventEmitter;
  @Output("updatedTask") updatedTask: EventEmitter<any> = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

  updateTask(description) {
    let taskInfo = { id: this.task['id'], status: this.task['status'], description }
    this.updatedTask.emit(taskInfo);
  }
  deleteTask() {
    let taskInfo = { id: this.task['id'], status: this.task['status'] }
    this.deletedTask.emit(taskInfo);
  }

  close() {
    this.closeDetails.emit();
  }

}
