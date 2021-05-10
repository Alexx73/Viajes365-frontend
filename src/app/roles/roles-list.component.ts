import { Component, OnInit } from '@angular/core';
import { Role, User } from '@app/_models';
import { PaginatedResponse } from '@app/_rest';
import { PaginationControls } from '@app/_rest/pagination.controls';
import { AccountService, RoleService } from '@app/_services';
import { first } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html'
})
export class RolesListComponent extends PaginationControls implements OnInit {
  page!: PaginatedResponse<Role>;
  rolesCollection!: Role[];
  currentUser!: User;
  isAdmin = false;

  constructor(
    private roleService: RoleService,
    private accountService: AccountService
  ) {
    super();
    this.currentUser = this.accountService.userValue;
    this.isAdmin = this.currentUser.role.roleName == 'Administrador';
    registerLocaleData(localeEs, 'es');
  }

  async ngOnInit(): Promise<void> {
    await this.roleService.getAll().subscribe((paged) => {
      this.rolesCollection = paged.listElements;
      this.page = paged;
    });
    this.initPaginated();
  }

  deleteRole(id: number): void {
    const role = this.rolesCollection.find((x) => x.roleId === id);
    if (!role) {
      return;
    }
    role.isDeleting = true;
    this.roleService
      .delete(id)
      .pipe(first())
      .subscribe(
        () =>
        (this.rolesCollection = this.rolesCollection.filter(
          (x) => x.roleId !== id
        ))
      );
  }

  async getPage(pageNumber: number) {
    try {
      this.actualpage = pageNumber;
      this.calculatePage();
      await this.roleService.getAll().subscribe((paged) => {
        this.rolesCollection = paged.listElements;
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
