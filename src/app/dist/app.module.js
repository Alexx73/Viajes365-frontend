"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var _helpers_1 = require("./_helpers");
var app_component_1 = require("./app.component");
var _components_1 = require("./_components");
var home_1 = require("./home");
var jwt_interceptor_1 = require("./_helpers/jwt.interceptor");
var navbar_component_1 = require("./_components/navbar.component");
var terms_and_conditions_component_1 = require("./home/terms-and-conditions/terms-and-conditions.component");
var apiclima_component_1 = require("./_components/apiclima.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_filesize_1 = require("ngx-filesize");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                ng_bootstrap_1.NgbModule,
                ngx_filesize_1.NgxFilesizeModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                _components_1.AlertComponent,
                home_1.HomeComponent,
                navbar_component_1.NavbarComponent,
                terms_and_conditions_component_1.TermsAndConditionsComponent,
                apiclima_component_1.ApiclimaComponent,
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: jwt_interceptor_1.JwtInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.ErrorInterceptor, multi: true },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
