import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { Location } from '@app/_models/location';
import { PaginatedResponse } from '@app/_rest';
import { PaginationControls } from '@app/_rest/pagination.controls';
import { AccountService } from '@app/_services';
import { LocationService } from '@app/_services/location.service';
import localeEs from '@angular/common/locales/es';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html'
})
export class LocationsListComponent extends PaginationControls implements OnInit {
  page!: PaginatedResponse<Location>;
  locationsCollection!: Location[];
  currentUser!: User;
  isAdmin = false;

  constructor(
    private locationService: LocationService,
    private accountService: AccountService
  ) {
    super();
    this.currentUser = this.accountService.userValue;
    this.isAdmin = this.currentUser.role.roleName == 'Administrador';
    registerLocaleData(localeEs, 'es');
  }

  async ngOnInit(): Promise<void> {
    await this.locationService.getAll().subscribe((paged) => {
      this.locationsCollection = paged.listElements;
      this.page = paged;
    });
    this.initPaginated();
  }

  
  deleteLocation(id: number): void {
    const location = this.locationsCollection.find((x) => x.locationId === id);
    if (!location) {
      return;
    }
    location.isDeleting = true;
    this.locationService
      .delete(id)
      .pipe(first())
      .subscribe(
        () =>
        (this.locationsCollection = this.locationsCollection.filter(
          (x) => x.locationId !== id
        ))
      );
  }

  async getPage(pageNumber: number) {
    try {
      this.actualpage = pageNumber;
      this.calculatePage();
      await this.locationService.getAll().subscribe((paged) => {
        this.locationsCollection = paged.listElements;
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
