import { Component } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services/account.service';
import { ChatService } from '@app/_services/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user!: User;

  constructor(
    private accountService: AccountService,
    private chatService: ChatService
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  logout(): void {
    this.chatService.clearActualChatUser();
    this.accountService.logout();
  }
}
