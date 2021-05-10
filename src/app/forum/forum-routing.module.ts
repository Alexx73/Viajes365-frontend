import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentEditorComponent } from './comment-editor.component';
import { CommentsComponent } from './comments.component';
import { TopicEditorComponent } from './topic-editor.component';
import { TopicsListComponent } from './topics-list.component';

const routes: Routes = [
  { path: '', component: TopicsListComponent },
  { path: 'topiclist', component: TopicsListComponent, pathMatch: 'full' },
  { path: 'comments/:id', component: CommentsComponent, pathMatch: 'full' },
  {
    path: 'comment-editor/:id',
    component: CommentEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'topiceditor/:id',
    component: TopicEditorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}
