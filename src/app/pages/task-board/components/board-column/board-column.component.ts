import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent implements OnInit {
  @Input('allTasks') allTasks = {};
  @Input('items') items = [];
  @Input('name') name = "";
  @Input('status') status = "";
  @Output("deletedTask") deletedTask: EventEmitter<any> = new EventEmitter;
  @Output("updatedTask") updatedTask: EventEmitter<any> = new EventEmitter;
  @Output("updatedTaskStatus") updatedTaskStatus: EventEmitter<any> = new EventEmitter;
  currentTask = {};
  showDetails = false;
  constructor() { }

  ngOnInit(): void {
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  dragItem(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  dropItem(ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("text"),
      taskId = Object.keys(this.allTasks).find(taskId => taskId === id),
      task = this.allTasks[taskId];
    if (task.status === "todo" && this.status === "done") return;
    
    this.updatedTaskStatus.emit({ id, status: this.status, oldStatus: task.status })
  }

  showDetailsPopup(task) {
    this.currentTask = { ...task };
    this.showDetails = true;
  }
  hideDetailsPopup() {
    this.showDetails = false;
  }
  updateTask(taskInfo) {
    this.updatedTask.emit(taskInfo);
    this.showDetails = false;
  }
  deleteTask(taskInfo) {
    this.deletedTask.emit(taskInfo);
    this.showDetails = false;
  }

}
