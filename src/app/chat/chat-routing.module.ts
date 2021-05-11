import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatEditorComponent } from './chat-editor.component';
import { ChatLoginComponent } from './chat-login.component';
import { ChatsListComponent } from './chats-list.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', component: ChatsListComponent },
  { path: 'chatslist', component: ChatsListComponent, pathMatch: 'full' },
  { path: 'chatroom', component: LayoutComponent, pathMatch: 'full' },
  { path: 'login', component: ChatLoginComponent, pathMatch: 'full' },
  {
    path: 'chat-editor/:id',
    component: ChatEditorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
