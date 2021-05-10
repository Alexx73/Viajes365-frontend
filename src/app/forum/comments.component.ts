import { Component, OnInit } from '@angular/core';
import { Topic, Comment } from '@app/_models';
import { PaginatedResponse } from '@app/_rest';
import { PaginationControls } from '@app/_rest/pagination.controls';
import { AccountService, CommentService, TopicService } from '@app/_services';
import { first } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent extends PaginationControls implements OnInit {
  page!: PaginatedResponse<Comment>;
  currentTopic!: Topic;
  commentsCollection!: Comment[];
  id!: number;
  loading = false;
  isAdmin = false;

  constructor(
    private commentService: CommentService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    super();
    registerLocaleData(localeEs, 'es');
    this.isAdmin =
      this.accountService.userValue.role.roleName == 'Administrador';
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    await this.topicService
      .getById(this.id)
      .pipe(first())
      .subscribe((x) => {
        this.currentTopic = x.element;
      });
    this.initPaginated();
    this.getPage(1);
  }

  deleteComment(id: number): void {
    const comment = this.commentsCollection.find((x) => x.commentId === id);
    if (!comment) {
      return;
    }
    comment.isDeleting = true;
    this.commentService
      .delete(id)
      .pipe(first())
      .subscribe(
        () =>
          (this.commentsCollection = this.commentsCollection.filter(
            (x) => x.commentId !== id
          ))
      );
  }

  async getPage(pageNumber: number) {
    try {
      this.actualpage = pageNumber;
      this.calculatePage();
      await this.commentService.getAllByTopicId(this.id).subscribe((paged) => {
        this.commentsCollection = paged.listElements;
        this.page = paged;
      });
      if (this.page) {
        this.totalRegister = this.page.totalElements;
      }
    } catch (error) {
      // this.notificationService.showDialog(DialogTypesEnum.Error, error.message);
    }
  }
}
