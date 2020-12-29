import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { routes } from './task-board.routing';
import { TaskBoardComponent } from './task-board.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';



@NgModule({
  declarations: [TaskBoardComponent, BoardColumnComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule
  ]
})
export class TaskBoardModule { }
