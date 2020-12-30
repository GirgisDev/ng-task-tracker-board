import { Component, OnInit } from '@angular/core';
import { TaskBoardService } from './services/task-board.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  tasks = [];
  constructor(private taskBoardService: TaskBoardService) { }

  ngOnInit(): void {
    this.getCurrentTasks()
  }

  getCurrentTasks() {
    this.taskBoardService.getCurrentTasks(tasks => {
      this.tasks = this.formatTasks(tasks);
    });
  }

  formatTasks(tasks) {
    let formattedTasks = [
      { id: 'todo', name: 'Todo', tasks: [] },
      { id: 'inProgress', name: 'In progress', tasks: [] },
      { id: 'inReview', name: 'In review', tasks: [] },
      { id: 'done', name: 'Done', tasks: [] },
    ]
    Object.keys(tasks).forEach(taskKey => {
      const task = tasks[taskKey],
        status = task.status;
      let category = formattedTasks.find(({ id }) => id === status);
      category.tasks.push(task);
    });
    return formattedTasks;
  }

  createNewTask() {
    let newTask = {
      id: `task${Object.keys(this.tasks).length + 1}`,
      description: "New task!",
      status: "todo",
      createdAt: (new Date()).toISOString()
    };

    this.taskBoardService.createNewTask(newTask, error => {
      if (error) alert("An error occured. Try again!");
      else this.getCurrentTasks();
    });
  }

}
