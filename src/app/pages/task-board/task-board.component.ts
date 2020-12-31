import { Component, OnInit } from '@angular/core';
import { TaskBoardService } from './services/task-board.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  tasks = [];
  allTasks = [];
  constructor(private taskBoardService: TaskBoardService) { }

  ngOnInit(): void {
    this.getCurrentTasks()
  }

  getCurrentTasks() {
    this.taskBoardService.getCurrentTasks(tasks => {
      this.tasks = this.formatTasks(tasks);
      this.allTasks = tasks;
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
      let task = tasks[taskKey],
        status = task.status;
      let category = formattedTasks.find(({ id }) => id === status);
      task = {
        ...task,
        id: taskKey
      }
      category.tasks.push(task);
    });
    return formattedTasks;
  }

  createNewTask() {
    let newTask = {
      id: `task${this.tasks.length + 1}`,
      description: "New task!",
      status: "todo",
      createdAt: (new Date()).toISOString()
    };

    this.taskBoardService.createNewTask(newTask, err => {
      if (err) alert("An error occured. Try again!");
      else this.getCurrentTasks();
    });
  }

  updateTask(taskInfo) {
    let taskObj = { ...taskInfo };
    delete taskObj['id'];
    this.taskBoardService.updateTaskStatus({ id: taskInfo.id, updatesObj: taskObj }, err => {
      if (err) alert("An error occured. Try again!");
      else this.updateTaskLocally(taskInfo);
    });
  }

  updateTaskLocally(taskInfo) {
    let category = this.tasks.find(({ id }) => id === taskInfo.status);
    let task = category.tasks.find(({ id }) => id === taskInfo.id);
    task.description = taskInfo.description;
  }

  updateTaskStatus(taskInfo) {
    const { id, status, oldStatus } = taskInfo
    this.taskBoardService.updateTaskStatus({ id, updatesObj: { status } }, err => {
      if (err) alert("An error occured. Try again!");
      else this.updateTaskStatusLocally(taskInfo);
    });
  }

  updateTaskStatusLocally(taskInfo) {
    let category = this.tasks.find(({ id }) => id === taskInfo.oldStatus),
      task = category.tasks.find(({ id }) => id === taskInfo.id),
      taskIndex = category.tasks.indexOf(task);

    category.tasks.splice(taskIndex, 1);
    let newCategory = this.tasks.find(({ id }) => id === taskInfo.status);
    task = { ...task, status: taskInfo.status };
    newCategory.tasks.push(task);
    this.getCurrentTasks();
  }

  deleteTask(taskInfo) {
    this.taskBoardService.removeTask(taskInfo.id, err => {
      if (err) alert("An error occured. Try again!");
      else this.deleteTaskLocally(taskInfo);
    });
  }

  deleteTaskLocally(taskInfo) {
    let category = this.tasks.find(({ id }) => id === taskInfo.status),
      task = category.tasks.find(({ id }) => id === taskInfo.id),
      taskIndex = category.tasks.indexOf(task);

    category.tasks.splice(taskIndex, 1);
  }

}
