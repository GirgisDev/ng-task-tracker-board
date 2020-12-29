import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskBoardService {

  constructor() { }

  updateTaskStatus({ id, status }, cb?) {
    // firebase.database().ref(`tasks/${id}`).update({ status }, error => {
    //   if (cb) cb(error);
    // });
  }
}
