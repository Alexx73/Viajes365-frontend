import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatEditorComponent } from './chat-editor.component';
import { ChatsListComponent } from './chats-list.component';
import { ChatsRoutingModule } from './chat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { ChatLoginComponent } from './chat-login.component';
import { AngularSplitModule } from 'angular-split';
import { ChatmessagesListComponent } from './chatmessages-list.component';

@NgModule({
  declarations: [ChatEditorComponent, ChatsListComponent, LayoutComponent, ChatLoginComponent, ChatmessagesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatsRoutingModule,
    AngularSplitModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es', // 'de' for Germany, 'fr' for France ...
    }]
})
export class ChatModule { }
