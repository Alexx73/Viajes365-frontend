import { Component, OnInit } from '@angular/core';
import { Topic, User } from '@app/_models';
import { PaginatedResponse } from '@app/_rest';
import { PaginationControls } from '@app/_rest/pagination.controls';
import { AccountService, TopicService } from '@app/_services';
import { first } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
})
export class TopicsListComponent extends PaginationControls implements OnInit {
  page!: PaginatedResponse<Topic>;
  topicsCollection!: Topic[];
  currentUser!: User;
  isAdmin = false;

  constructor(
    private topicService: TopicService,
    private accountService: AccountService
  ) {
    super();
    this.currentUser = this.accountService.userValue;
    this.isAdmin = this.currentUser.role.roleName == 'Administrador';
    registerLocaleData(localeEs, 'es');
  }

  async ngOnInit(): Promise<void> {
    await this.topicService.getAll().subscribe((paged) => {
      this.topicsCollection = paged.listElements;
      this.page = paged;
    });
    this.initPaginated();
  }

  deleteTopic(id: number): void {
    const topic = this.topicsCollection.find((x) => x.topicId === id);
    if (!topic) {
      return;
    }
    topic.isDeleting = true;
    this.topicService
      .delete(id)
      .pipe(first())
      .subscribe(
        () =>
        (this.topicsCollection = this.topicsCollection.filter(
          (x) => x.topicId !== id
        ))
      );
  }

  async getPage(pageNumber: number) {
    try {
      this.actualpage = pageNumber;
      this.calculatePage();
      await this.topicService.getAll().subscribe((paged) => {
        this.topicsCollection = paged.listElements;
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
