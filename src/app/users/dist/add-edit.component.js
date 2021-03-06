"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var environment_1 = require("@environments/environment");
var _helpers_1 = require("@app/_helpers");
var ngx_image_cropper_1 = require("ngx-image-cropper");
var http_1 = require("@angular/common/http");
var ngx_filesize_1 = require("ngx-filesize");
var fileSizePipe = new ngx_filesize_1.FileSizePipe();
var baseUrl = environment_1.environment.baseUrl + "/";
var AddEditComponent = /** @class */ (function () {
    function AddEditComponent(formBuilder, route, router, userService, fileUploadService, roleService, alertService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.fileUploadService = fileUploadService;
        this.roleService = roleService;
        this.alertService = alertService;
        this.imageChangedEvent = '';
        this.currentImagePath = '';
        this.loading = false;
        this.submitted = false;
        this.roles = new Array();
        this.activeLabel = 'No';
        this.percentCompleted = 0;
        this.urlAfterUpload = '';
        this.isSingleUploaded = false;
        this.loadedFlag = false;
    }
    AddEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        // password not required in edit mode
        var passwordValidators = [forms_1.Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(forms_1.Validators.required);
        }
        // populate active roles
        this.roleService
            .getAll()
            .pipe(operators_1.first())
            .subscribe(function (pagedroles) {
            pagedroles.listElements.forEach(function (rol) {
                if (rol.active)
                    _this.roles.push(rol);
            });
        });
        var formOptions = {
            validators: _helpers_1.MustMatch('password', 'confirmPassword')
        };
        this.form = this.formBuilder.group({
            file: [null],
            fileName: [''],
            userId: ['', forms_1.Validators.required],
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            roleId: ['', forms_1.Validators.required],
            role: ['', forms_1.Validators.required],
            password: [
                '',
                [
                    forms_1.Validators.minLength(5),
                    this.isAddMode ? forms_1.Validators.required : forms_1.Validators.nullValidator,
                ],
            ],
            confirmPassword: [
                '',
                this.isAddMode ? forms_1.Validators.required : forms_1.Validators.nullValidator,
            ],
            active: ['', forms_1.Validators.required]
        }, formOptions);
        if (!this.isAddMode) {
            this.userService
                .getById(this.id)
                .pipe(operators_1.first())
                .subscribe(function (x) {
                _this.currentUser = x.element;
                _this.refreshCurrentImage(x.element.photo.path);
                _this.form.patchValue(x.element);
                _this.form.controls['role'].patchValue(x.element.roleId);
                _this.form.controls['roleId'].patchValue(x.element.roleId);
                _this.form.controls['active'].patchValue(x.element.active);
                _this.activeToggle();
            });
        }
    };
    Object.defineProperty(AddEditComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    AddEditComponent.prototype.onSubmit = function () {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        }
        else {
            this.updateUser();
        }
    };
    AddEditComponent.prototype.createUser = function () {
        var _this = this;
        this.userService
            .create(this.form.value)
            .pipe(operators_1.first())
            .subscribe(function () {
            _this.alertService.success('Usuario agregado', {
                keepAfterRouteChange: true
            });
            _this.router.navigate(['../'], { relativeTo: _this.route });
        })
            .add(function () { return (_this.loading = false); });
    };
    AddEditComponent.prototype.updateUser = function () {
        var _this = this;
        if (this.loadedFlag) {
            this.form.patchValue({
                file: this.croppedToFile()
            });
        }
        // this.form.get('file')!.updateValueAndValidity();
        this.userService
            .update(this.id, this.form.value)
            .pipe(operators_1.first())
            .subscribe(function () {
            _this.alertService.success('Usuario actualizado', {
                keepAfterRouteChange: true
            });
            _this.router.navigate(['/users/list'], { relativeTo: _this.route });
        })
            .add(function () { return (_this.loading = false); });
    };
    AddEditComponent.prototype.onChangeRole = function (e) {
        // sincroniza el select con el Role Id
        this.form.controls['roleId'].patchValue(e.target.value);
    };
    AddEditComponent.prototype.activeToggle = function () {
        this.activeLabel = this.form.get('active').value ? 'S??' : 'No';
    };
    AddEditComponent.prototype.fileChangeEvent = function (event) {
        this.currentUser.photoId = 0;
        this.imageChangedEvent = event;
    };
    AddEditComponent.prototype.imageCropped = function (event) {
        var _this = this;
        this.croppedImage = event.base64;
        var formData = new FormData();
        this.urlAfterUpload = '';
        this.isSingleUploaded = false;
        var file = this.croppedToFile();
        formData.append('file', file);
        formData.append('category', 'avatars');
        this.fileUploadService.uploadWithProgress(formData).subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                _this.percentCompleted = Math.round((100 * event.loaded) / event.total);
            }
            else if (event instanceof http_1.HttpResponse) {
                // console.log(file.name + ', Size: ' + file.size + ', Uploaded URL: ' + event.body.path);
                _this.isSingleUploaded = true;
                _this.urlAfterUpload =
                    'Tama??o: ' +
                        fileSizePipe.transform(file.size) +
                        ', Dimensiones: 150 x 150 pixels';
                _this.refreshCurrentImage(event.body.path);
            }
        }, function (err) { return console.log(err); });
    };
    AddEditComponent.prototype.imageLoaded = function () {
        this.loadedFlag = true;
        /* show cropper */
    };
    AddEditComponent.prototype.cropperReady = function () {
        /* cropper ready */
    };
    AddEditComponent.prototype.loadImageFailed = function () {
        this.loadedFlag = false;
        /* show message */
    };
    AddEditComponent.prototype.croppedToFile = function () {
        // Assuming you have already stored the event.base64 in 'croppedImage'
        var file = new File([ngx_image_cropper_1.base64ToFile(this.croppedImage)], 'user-avatar' + this.currentUser.userId + '.png');
        return file;
    };
    AddEditComponent.prototype.refreshCurrentImage = function (relativePath) {
        // Base Url must be in the environment
        this.currentImagePath =
            baseUrl + relativePath + '?random+=' + Math.random();
    };
    AddEditComponent = __decorate([
        core_1.Component({ templateUrl: 'add-edit.component.html' })
    ], AddEditComponent);
    return AddEditComponent;
}());
exports.AddEditComponent = AddEditComponent;
