"use strict";
exports.__esModule = true;
exports.PaginationControls = void 0;
var PAGE_SIZE = 10;
var PaginationControls = /** @class */ (function () {
    // -- end paginated
    function PaginationControls() {
        this.actualpage = 0;
        this.filterRequest = {
            object: {},
            pageNumber: 0,
            pageSize: PAGE_SIZE
        };
    }
    PaginationControls.prototype.initPaginated = function () {
        this.pagesize = PAGE_SIZE;
        this.actualpage = 1;
        this.arrayvalueitemsperpage = ['5', '10', '20', '50', '100'];
    };
    PaginationControls.prototype.calculatePage = function () {
        this.filterRequest.pageNumber = this.actualpage - 1; // En Back End en la clase  PageRequest indica que el pageNumber es base cero
        this.filterRequest.pageSize = this.pagesize;
    };
    PaginationControls.prototype.resetPaginated = function () {
        this.actualpage = 0;
        this.filterRequest.pageSize = 0;
        this.filterForm.reset();
    };
    return PaginationControls;
}());
exports.PaginationControls = PaginationControls;
