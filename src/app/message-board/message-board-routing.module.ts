import { MessageBoardComponent } from './message-board.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const messageBoardRoutes: Routes = [
  {
    path: 'message-board',
    component: MessageBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(messageBoardRoutes)],
  exports: [RouterModule]
})
export class MessageBoardRoutingModule {}
