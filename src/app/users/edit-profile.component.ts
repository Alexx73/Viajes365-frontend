import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '@app/_services';
import { environment } from '@environments/environment';
import { MustMatch } from '@app/_helpers';
import { Role, User } from '@app/_models';
import { RoleService } from '@app/_services/role.service';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '@app/_services/fileupload.service';
import { FileSizePipe } from 'ngx-filesize';

const fileSizePipe = new FileSizePipe();
const baseUrl = `${environment.baseUrl}/`;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any;
  currentUser!: User;
  currentImagePath: any = '';
  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  activeLabel = 'No';
  percentCompleted: number = 0;
  urlAfterUpload = '';
  isSingleUploaded = false;
  loadedFlag = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private roleService: RoleService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'confirmPassword'),
    };
    this.form = this.formBuilder.group(
      {
        file: [null],
        fileName: [''],
        userId: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        roleId: ['', Validators.required],
        role: ['', Validators.required],
        password: [
          '',
          [
            Validators.minLength(5),
            this.isAddMode ? Validators.required : Validators.nullValidator,
          ],
        ],
        confirmPassword: [
          '',
          this.isAddMode ? Validators.required : Validators.nullValidator,
        ],
        active: ['', Validators.required],
      },
      formOptions
    );

    if (!this.isAddMode) {
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.currentUser = x.element;
          this.refreshCurrentImage(x.element.photo.path);
          this.form.patchValue(x.element);
          this.form.controls['role'].patchValue(x.element.roleId);
          this.form.controls['roleId'].patchValue(x.element.roleId);
          this.form.controls['active'].patchValue(x.element.active);
          this.activeToggle();
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
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
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService
      .create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Usuario agregado', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  private updateUser() {
    if (this.loadedFlag) {
      this.form.patchValue({
        file: this.croppedToFile(),
      });
    }
    // this.form.get('file')!.updateValueAndValidity();
    this.userService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Usuario actualizado', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/users/profile/' + this.id], {
          relativeTo: this.route,
        });
      })
      .add(() => (this.loading = false));
  }

  activeToggle(): void {
    this.activeLabel = this.form.get('active')!.value ? 'Sí' : 'No';
  }

  fileChangeEvent(event: any): void {
    this.currentUser.photoId = 0;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var formData = new FormData();
    this.urlAfterUpload = '';
    this.isSingleUploaded = false;
    const file = this.croppedToFile();
    formData.append('file', file);
    formData.append('category', 'avatars');
    this.fileUploadService.uploadWithProgress(formData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          // console.log(file.name + ', Size: ' + file.size + ', Uploaded URL: ' + event.body.path);
          this.isSingleUploaded = true;
          this.urlAfterUpload =
            'Tamaño: ' +
            fileSizePipe.transform(file.size) +
            ', Dimensiones: 150 x 150 pixels';
          this.refreshCurrentImage(event.body.path);
        }
      },
      (err) => console.log(err)
    );
  }

  imageLoaded() {
    this.loadedFlag = true;
    /* show cropper */
  }

  cropperReady() {
    /* cropper ready */
  }

  loadImageFailed() {
    this.loadedFlag = false;
    /* show message */
  }

  croppedToFile(): File {
    // Assuming you have already stored the event.base64 in 'croppedImage'
    const file: File = new File(
      [base64ToFile(this.croppedImage)],
      'user-avatar' + this.currentUser.userId + '.png'
    );
    return file;
  }

  refreshCurrentImage(relativePath: string): void {
    // Base Url must be in the environment
    this.currentImagePath =
      baseUrl + relativePath + '?random+=' + Math.random();
  }
}
