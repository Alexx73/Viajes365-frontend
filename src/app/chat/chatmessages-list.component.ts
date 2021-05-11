import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chat, Chatcomment } from '@app/_models';
import { ChatService } from '@app/_services/chat.service';
import { ChatcommentService } from '@app/_services/chatcomment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatmessages-list',
  templateUrl: './chatmessages-list.component.html',
})
export class ChatmessagesListComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollBottom') private scrollBottom!: ElementRef;

  currentChat!: Chat;
  subscription!: Subscription;
  messagesCollection!: Chatcomment[];
  isEmpty!: boolean;

  constructor(
    private chatService: ChatService,
    private chatCommentsService: ChatcommentService
  ) {
    // subscribe to chat component
    this.subscription = this.chatService.getActualChat().subscribe((chat) => {
      if (chat) {
        this.currentChat = chat;
        this.populate(chat.chatId);
      } else {
        // when empty object received
        this.currentChat = new Chat();
      }
    });
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  async populate(id: number): Promise<void> {
    var lastPage = 0;
    await this.chatCommentsService.getAllByChatId(id, 1).subscribe((res) => {
      this.messagesCollection = res.listElements;
      lastPage = +res.totalPages;
      this.chatCommentsService.getAllByChatId(id, lastPage).subscribe((res) => {
        this.messagesCollection = res.listElements;
        this.isEmpty = res.listElements.length == 0;
      });
    });
  }
}
