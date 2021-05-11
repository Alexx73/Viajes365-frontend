import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { AlertService } from '@app/_services';
import { AccountService } from '@app/_services';
import { ChatService } from '@app/_services/chat.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
})
export class ChatLoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  chatUser!: User;
  currentUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nick: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log('aca para');
      return;
    }

    this.loading = true;
    this.chatUser = this.chatService.login(
      this.f.nick.value,
      this.f.email.value
    );
    if (this.chatUser.chatEmail != '') {
      this.loading = false;
      this.router.navigateByUrl('/chats/chatroom');
    } else {
      this.loading = false;
      alert('Error en los datos revise y vuelva a intentar');
    }
  }
}
