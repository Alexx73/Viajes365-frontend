import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionsListComponent } from './attractions-list.component';
import { AttractionsEditorComponent } from './attractions-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumRoutingModule } from '@app/forum/forum-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AttractionsRoutingModule } from './attractions-routing.module';

@NgModule({
  declarations: [AttractionsListComponent, AttractionsEditorComponent],
  imports: [
    CommonModule,
    AttractionsRoutingModule,
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
  ]
})
export class AttractionsModule { }
