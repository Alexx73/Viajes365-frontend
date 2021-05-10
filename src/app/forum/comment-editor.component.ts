import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic, Comment, User } from '@app/_models';
import { AccountService, CommentService, TopicService } from '@app/_services';
import { first } from 'rxjs/operators';

const MAX_CHARS = 144;

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
})
export class CommentEditorComponent implements OnInit {
  loading = false;
  id!: number;
  topic!: Topic;
  message: any;
  currentUser!: User;
  chars = MAX_CHARS;

  constructor(
    private commentService: CommentService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.currentUser = this.accountService.userValue;
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    await this.topicService
      .getById(this.id)
      .pipe(first())
      .subscribe((x) => {
        this.topic = x.element;
      });
  }

  async saveComment() {
    this.loading = true;
    var comment = new Comment();
    comment.body = this.message;
    comment.status = 'aprobado';
    comment.userId = this.currentUser.userId;
    comment.topicId = this.topic.topicId;
    comment.active = true;
    await this.commentService.create(comment).subscribe(
      (c) => {
        console.log('mensage: ' + this.message);
        this.getBack();
      },
      (error) => {
        console.log(error);
        this.getBack();
      }
    );
  }

  getBack(): void {
    this.loading = false;
    console.log('/forum/comments/' + this.topic.topicId)
    this.router.navigateByUrl('/forum/comments/' + this.topic.topicId);
  }

  showStats() {
    this.chars = MAX_CHARS - this.getStats().chars;
  }
  getStats() {
    return {
      chars: this.message.length,
      words: this.message.split(/[\w\u2019\'-]+/).length,
    };
  }
}
