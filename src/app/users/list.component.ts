import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@app/_services';
import { User } from '@app/_models';
import { PaginatedResponse } from '@app/_rest/paginated.response';
import { PaginationControls } from '@app/_rest/pagination.controls';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent extends PaginationControls implements OnInit {
  page!: PaginatedResponse<User>;
  usersCollection!: User[];

  constructor(private userService: UserService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.userService.getAll().subscribe((paged) => {
      this.usersCollection = paged.listElements;
      this.page = paged;
    });
    this.initPaginated();
  }

  deleteUser(id: number): void {
    const user = this.usersCollection.find((x) => x.userId === id);
    if (!user) {
      return;
    }
    user.isDeleting = true;
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(
        () =>
          (this.usersCollection = this.usersCollection.filter(
            (x) => x.userId !== id
          ))
      );
  }

  async getPage(pageNumber: number) {
    try {
      this.actualpage = pageNumber;
      this.calculatePage();
      await this.userService.getAll().subscribe((paged) => {
        this.usersCollection = paged.listElements;
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
