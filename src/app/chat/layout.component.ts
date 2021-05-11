import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { ChatService } from '@app/_services/chat.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
