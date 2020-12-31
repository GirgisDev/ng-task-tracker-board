import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class TaskBoardService {

  constructor() { }

  private db() {
    return firebase.database().ref('tasks');
  }

  updateTaskStatus({ id, updatesObj }, cb?) {
    firebase.database().ref(`tasks/${id}`).update(updatesObj, error => {
      if (cb) cb(error);
    });
  }
  getCurrentTasks(cb) {
    return this.db().once('value', snapshot => {
      cb(snapshot.val())
    });
  }
  createNewTask(data, cb) {
    this.db().push(data, error => {
      if (cb) cb(error);
    });
  }
  removeTask(id, cb) {
    return firebase.database().ref(`/tasks/${id}`).remove(error => {
      if (cb) cb(error)
    });
  }
}
