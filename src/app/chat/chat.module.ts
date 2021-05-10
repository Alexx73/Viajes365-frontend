import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatEditorComponent } from './chat-editor.component';
import { ChatsListComponent } from './chats-list.component';
import { ChatsRoutingModule } from './chat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatEditorComponent, ChatsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatsRoutingModule,
  ]
})
export class ChatModule { }
