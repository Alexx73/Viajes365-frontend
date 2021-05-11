import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Chat, User } from '@app/_models';
import { ChatService } from '@app/_services/chat.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AccountService } from '@app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
})
export class ChatsListComponent implements OnInit {
  currentChat!: Chat;
  currentChatUser: User | undefined;
  currentUser: User | undefined;
  chatCollection!: Chat[];

  constructor(
    private chatService: ChatService,
    private accountService: AccountService,
    private router: Router
  ) {
    registerLocaleData(localeEs, 'es'); // important for dates
    this.currentUser = this.accountService.userValue;
    this.currentChatUser = this.chatService.userValue;
  }

  async ngOnInit(): Promise<void> {
    // admin can see all chats
    if (this.currentUser?.role) {
      if (this.currentUser.role.roleName == 'Administrador') {
        await this.chatService
          .getAll()
          .subscribe((c) => (this.chatCollection = c.listElements.reverse()));
      }
      // user only can see his own
      if (this.currentUser!.role.roleName == 'Usuario') {
        this.populate(this.currentUser.chatEmail, this.currentUser.nick);
      }
    } else if (this.currentChatUser?.nick && this.currentChatUser?.nick) {
      // anonymous only his own random
      this.populate(this.currentChatUser.chatEmail, this.currentChatUser.nick);
    } else {
      // no found historic chat make login for chat
      this.router.navigateByUrl('chats/login');
    }
  }

  activateClass(chat: Chat): void {
    this.chatCollection.forEach((c) => (c.isSelected = false));
    chat.isSelected = !chat.isSelected;
    this.currentChat = chat;
    this.chatService.setActualChat(chat);
  }

  // this fills the chat column by finding owners or creating
  async populate(chatEmail: string, nick: string): Promise<void> {
    this.chatCollection = []; // init empty
    await this.chatService.getByEmail(chatEmail).subscribe(
      (c) => this.chatCollection.push(c.element),
      (error) => {
        if (this.chatCollection.length == 0) {
          this.chatService.getByNick(nick).subscribe(
            (c) => this.chatCollection.push(c.element),
            (error) => {
              // still no chat found create new one
              if (this.chatCollection.length == 0) {
                var chat = new Chat();
                chat.nick = nick;
                chat.email = chatEmail;
                chat.status = 'Aprobado';
                chat.chatId = 0;
                chat.active = true;
                this.chatService
                  .create(chat)
                  .subscribe((c) => this.chatCollection.push(c));
              }
            }
          );
        }
      }
    );
  }
}
