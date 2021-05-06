import { FormGroup } from "@angular/forms";
import { FilterRequest } from "./filterrequest.interface";

const PAGE_SIZE = 10

export class PaginationControls {
  // -- paginated
  filterForm!: FormGroup;
  actualpage = 0;

  totalRegister!: number;
  arrayvalueitemsperpage!: string[];
  pagesize!: number;


  filterRequest: FilterRequest = {
    object: {},
    pageNumber: 0,
    pageSize: PAGE_SIZE
  };

  // -- end paginated

  constructor() { }

  initPaginated() {
    this.pagesize = PAGE_SIZE;
    this.actualpage = 1;
    this.arrayvalueitemsperpage = ['5', '10', '20', '50', '100'];
  }

  calculatePage() {
    this.filterRequest.pageNumber = this.actualpage - 1; // En Back End en la clase  PageRequest indica que el pageNumber es base cero
    this.filterRequest.pageSize = this.pagesize;
  }

  resetPaginated() {
    this.actualpage = 0;
    this.filterRequest.pageSize = 0;
    this.filterForm.reset();
  }
}
