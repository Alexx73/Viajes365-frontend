import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AccountService } from '@app/_services/account.service';
import { ChatService } from '@app/_services/chat.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private chatService: ChatService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    const chatuser = this.chatService.getActualChatUser();
    if (user || chatuser) {
      // authorized so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
