import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsListComponent } from './topics-list.component';
import { CommentsComponent } from './comments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumRoutingModule } from './forum-routing.module';
import { CommentEditorComponent } from './comment-editor.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { TopicEditorComponent } from './topic-editor.component';

@NgModule({
  declarations: [
    TopicsListComponent,
    CommentsComponent,
    CommentEditorComponent,
    TopicEditorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForumRoutingModule,
    NgxPaginationModule,
    FormsModule,
    EditorModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es', // 'de' for Germany, 'fr' for France ...
    },
    {
      provide: TINYMCE_SCRIPT_SRC,
      useValue: 'tinymce/tinymce.min.js', // minified tinymce
    },
  ],
})
export class ForumModule {}
