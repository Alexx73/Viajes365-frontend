"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ApiclimaComponent = void 0;
var core_1 = require("@angular/core");
var _models_1 = require("@app/_models");
var ApiclimaComponent = /** @class */ (function () {
    function ApiclimaComponent(fb, cityService, weatherService) {
        this.fb = fb;
        this.cityService = cityService;
        this.weatherService = weatherService;
        this.cityForm = this.fb.group({
            city: [null]
        });
    }
    ApiclimaComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cityService.getAll().subscribe(function (pagedCities) {
                            try {
                                _this.citiesCollection = pagedCities.listElements.filter(function (c) { return c.active == true; }).sort(function (a, b) { return a.name.localeCompare(b.name); });
                                _this.setDefaults();
                            }
                            catch (error) {
                                console.log(pagedCities.message);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiclimaComponent.prototype.cityChange = function (e) {
        var id = e.target.value;
        var cityId = Number(id.split(':')[1]);
        this.cityQuery(cityId);
    };
    ;
    ApiclimaComponent.prototype.cityQuery = function (cityId) {
        var _this = this;
        if (cityId > 0) {
            this.currentCity = this.getCityByCityId(cityId);
            this.weatherService.getByCode(this.currentCity.code).
                subscribe(function (weather) {
                _this.currentTemperature = weather.hours[0].temperature;
                _this.weatherIconUrl = weather.hours[0].icon;
                _this.currentTempUnit = weather.information.temperature;
                _this.currentHumidityUnit = weather.information.humidity;
                _this.currentPressureUnit = weather.information.pressure;
                _this.currentStatus = weather.hours[0].text;
                _this.currentHumidity = weather.hours[0].humidity;
                _this.currentPressure = weather.hours[0].pressure;
                // weather icons are already in our assets folder
                _this.weatherIconUrl = 'assets/images/icons/tutiempo/wi/' + _this.weatherIconUrl + '.png';
            });
        }
    };
    ApiclimaComponent.prototype.getCityByCityId = function (id) {
        var city = this.citiesCollection.find(function (c) { return c.cityId == id; });
        if (city) {
            return city;
        }
        return new _models_1.City();
    };
    ApiclimaComponent.prototype.setDefaults = function () {
        // Select initial City
        var defaultCityName = 'Paraná';
        var initialCityId = this.citiesCollection.findIndex(function (c) { return c.name == defaultCityName; }) + 1;
        this.cityForm.get('city').patchValue(initialCityId);
        this.cityQuery(initialCityId);
    };
    ApiclimaComponent = __decorate([
        core_1.Component({
            selector: 'apiclima',
            templateUrl: './apiclima.component.html'
        })
    ], ApiclimaComponent);
    return ApiclimaComponent;
}());
exports.ApiclimaComponent = ApiclimaComponent;
