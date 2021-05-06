"use strict";
exports.__esModule = true;
exports.SingleObjectResponse = void 0;
var SingleObjectResponse = /** @class */ (function () {
    // Compiled JavaScript has all types erased, passing the type into the constructor as function to fix the problem.
    function SingleObjectResponse(Type) {
        this.Type = Type;
        this.element = this.getNew();
        this.succeeded = false;
        this.errors = '';
        this.message = '';
        this.errorCode = 0;
    }
    SingleObjectResponse.prototype.getNew = function () {
        return new this.Type();
    };
    return SingleObjectResponse;
}());
exports.SingleObjectResponse = SingleObjectResponse;
