import { Component, OnInit } from '@angular/core';
import { City, User } from '@app/_models';
import { PaginatedResponse } from '@app/_rest';
import { PaginationControls } from '@app/_rest/pagination.controls';
import { AccountService } from '@app/_services';
import { CityService } from '@app/_services/city.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html'
})
export class CitiesListComponent extends PaginationControls implements OnInit {
  page!: PaginatedResponse<City>;
  citiesCollection!: City[];
  currentUser!: User;
  isAdmin = false;

  constructor(
    private cityService: CityService,
    private accountService: AccountService
  ) {
    super();
    this.currentUser = this.accountService.userValue;
    this.isAdmin = this.currentUser.role.roleName == 'Administrador';
    registerLocaleData(localeEs, 'es');
  }

  async ngOnInit(): Promise<void> {
    await this.cityService.getAll().subscribe((paged) => {
      
      this.citiesCollection = paged.listElements;
      console.log(this.citiesCollection);
      this.page = paged;
    });
    this.initPaginated();
  }

  deleteCity(id: number): void {
    console.log("delete id: ", id);
    
    const city = this.citiesCollection.find((x) => x.cityId === id);
    if (!city) {
      return;
    }
    city.isDeleting = true;
    this.cityService
      .delete(id)
      .pipe(first())
      .subscribe(
        () =>
        (this.citiesCollection = this.citiesCollection.filter(
          (x) => x.cityId !== id
        ))
      );
  }

  async getPage(pageNumber: number) {
    try {
      this.actualpage = pageNumber;
      this.calculatePage();
      await this.cityService.getAll().subscribe((paged) => {
        this.citiesCollection = paged.listElements;
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
