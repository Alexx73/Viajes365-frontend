"use strict";
exports.__esModule = true;
exports.PaginatedResponse = void 0;
var PaginatedResponse = /** @class */ (function () {
    function PaginatedResponse() {
        this.listElements = new Array();
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
    return PaginatedResponse;
}());
exports.PaginatedResponse = PaginatedResponse;
