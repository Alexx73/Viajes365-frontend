import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat, User } from '@app/_models';
import { PaginatedResponse, SingleObjectResponse } from '@app/_rest';
import { environment } from '@environments/environment';
import { Observable, Subject } from 'rxjs';
import { AccountService } from './account.service';

const baseUrl = `${environment.apiUrl}/chats`;

@Injectable({ providedIn: 'root' })
export class ChatService {
  private subject = new Subject<any>();
  private actualChat = new Subject<Chat>();
  private actualChatUser = new Subject<User>();
  private chatUser!: User;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getAll(): Observable<PaginatedResponse<Chat>> {
    return this.http.get<PaginatedResponse<Chat>>(`${baseUrl}`);
  }

  getById(id: number): Observable<SingleObjectResponse<Chat>> {
    return this.http.get<SingleObjectResponse<Chat>>(`${baseUrl}/${id}`);
  }

  getByEmail(email: string): Observable<SingleObjectResponse<Chat>> {
    return this.http.get<SingleObjectResponse<Chat>>(
      `${baseUrl}/0?chatemail=${email}`
    );
  }

  getByNick(nick: string): Observable<SingleObjectResponse<Chat>> {
    return this.http.get<SingleObjectResponse<Chat>>(
      `${baseUrl}/0?nick=${nick}`
    );
  }

  create(params: any): Observable<any> {
    return this.http.post(baseUrl, params);
  }

  update(id: number, params: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // messages methods

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // actualChat methods

  setActualChat(chat: Chat): void {
    this.actualChat.next(chat);
  }

  clearActualChat(): void {
    this.actualChat.next();
  }

  getActualChat(): Observable<Chat> {
    return this.actualChat.asObservable();
  }

  // actualChatUser methods

  setActualChatUser(user: User): void {
    this.actualChatUser.next(user);
  }

  clearActualChatUser(): void {
    this.actualChatUser.next();
  }

  getActualChatUser(): Observable<User> {
    return this.actualChatUser.asObservable();
  }

  public get userValue(): User {
    return this.chatUser;
  }

  // login chatUser for logged and anonymous user
  login(nick: any, email: any): User {
    if (!this.accountService.userValue) {
      this.chatUser = this.accountService.userValue;
      this.chatUser.nick = nick;
      this.chatUser.chatEmail = email;
      this.actualChatUser.next(this.chatUser);
      return this.chatUser;
    } else {
      this.chatUser = new User();
      this.chatUser.nick = nick;
      this.chatUser.chatEmail = email;
      this.actualChatUser.next(this.chatUser);
      return this.chatUser;
    }
  }
}
