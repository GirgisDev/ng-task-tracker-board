import { Component, Input, OnInit } from '@angular/core';
import { TaskBoardService } from './../../services/task-board.service';

@Component({
  selector: 'board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent implements OnInit {
  @Input('allTasks') allTasks = [];
  @Input('items') items = [];
  @Input('name') name = "";
  @Input('status') status = "";
  currentTask = {};
  showDetails = false;
  constructor(private taskBoardService: TaskBoardService) { }

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
      task = this.allTasks.find(task => task.id === id);

    if (task.status === "todo" && status === "done") return;

    this.taskBoardService.updateTaskStatus({ id, status });
  }

  showDetailsPopup(task) {
    this.currentTask = { ...task };
    this.showDetails = true;
  }
  hideDetailsPopup() {
    this.showDetails = false;
  }

  addNewTask() {
    return false;
  }

}
