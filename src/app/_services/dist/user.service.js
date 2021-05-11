"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@environments/environment");
// import { PhotoService } from './photo.service';
var baseUrl = environment_1.environment.apiUrl + "/users";
var UserService = /** @class */ (function () {
    function UserService(http, photoService) {
        this.http = http;
        this.photoService = photoService;
    }
    UserService.prototype.getAll = function () {
        return this.http.get("" + baseUrl);
    };
    UserService.prototype.getById = function (id) {
        return this.http.get(baseUrl + "/" + id);
    };
    UserService.prototype.create = function (params) {
        // if (params.fileName != null) {
        //   let photo = new Photo();
        //   photo.path = params.fileName;
        //   photo.name = params.fileName;
        //   let par = { "photo": photo, "file": params.fileName, "category": "avatars" };
        //   params.fileName = this.photoService.create(par);
        // }
        return this.http.post(baseUrl, params);
    };
    UserService.prototype.update = function (id, params) {
        // console.log(params.fileName, photoId);
        // if (params.fileName != null && photoId == 0) {
        //   let photo = new Photo();
        //   photo.path = params.fileName;
        //   photo.name = params.fileName;
        //   let par = { "photo": photo, "file": params.file, "category": "avatars" };
        //   this.photoService.create(par).subscribe(res => { params.fileName = res; });
        // }
        return this.http.put(baseUrl + "/" + id, params);
    };
    UserService.prototype["delete"] = function (id) {
        return this.http["delete"](baseUrl + "/" + id);
    };
    UserService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
