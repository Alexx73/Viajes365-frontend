export class PaginatedResponse<T> {
  public listElements: T[];
  public totalElements: number;
  public totalPages: number;
  public pageNumber: number;
  public pageSize: number;
  public firstPage: string;
  public lastPage: string;
  public nextPage: string;
  public previousPage: string;
  public succeeded: boolean;
  public errors: string;
  public message: string;
  public errorCode: number;

  constructor() {
    this.listElements = new Array<T>();
    this.totalElements = 0;
    this.totalPages = 0;
    this.pageNumber = 0;
    this.pageSize = 0;
    this.firstPage = '';
    this.lastPage = '';
    this.nextPage = '';
    this.previousPage = '';
    this.succeeded = false;
    this.errors = '';
    this.message = '';
    this.errorCode = 0;
  }
}
