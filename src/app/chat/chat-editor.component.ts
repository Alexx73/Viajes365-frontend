import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat, Chatcomment, User } from '@app/_models';
import { AccountService } from '@app/_services';
import { ChatService } from '@app/_services/chat.service';
import { ChatcommentService } from '@app/_services/chatcomment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-editor',
  templateUrl: './chat-editor.component.html',
})
export class ChatEditorComponent implements OnInit, OnDestroy {
  currentChat!: Chat;
  currentUser!: User;
  subscription!: Subscription;
  message = '';
  loading = false;
  isAdmin = false;

  constructor(
    private accountService: AccountService,
    private chatService: ChatService,
    private chatCommentsService: ChatcommentService
  ) {
    this.currentUser = this.accountService.userValue;
    // subscribe to chat component
    this.subscription = this.chatService.getActualChat().subscribe((chat) => {
      if (chat) {
        this.currentChat = chat;
      } else {
        // when empty object received
        this.currentChat = new Chat();
      }
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.currentUser.role.roleName == 'Administrador';
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  async sendMessage(): Promise<void> {
    this.loading = true;
    if (this.message.length > 0) {
      var chatComment = new Chatcomment();
      chatComment.chatId = this.currentChat.chatId;
      chatComment.message = this.message;
      chatComment.userId = this.currentUser.userId;

      chatComment.active = true;
      if (this.isAdmin) {
        chatComment.isResponse = true;
        chatComment.status =
          'respuesta de ' +
          this.currentUser.firstName +
          ', ' +
          this.currentUser.lastName +
          ' el ';
      } else {
        chatComment.isResponse = false;
        chatComment.status = 'Consulta pendiente';
      }

      await this.chatCommentsService.create(chatComment).subscribe(
        (res) => {
          this.loading = false;
          this.message = '';
          this.chatService.setActualChat(this.currentChat);
        },
        (error) => alert(error)
      );
    }
  }
}
