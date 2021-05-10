import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { RoleService, AlertService, AccountService } from '@app/_services';
import { Role, User } from '@app/_models';
@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html'
})
export class RoleEditorComponent implements OnInit {
  currentRole!: Role;
  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  activeLabel = 'Sí';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private alertService: AlertService,
    ) {
      
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = this.id <= 0;
    // populate active roles

    this.form = this.formBuilder.group(
      {
        roleId: ['0'],
        roleName: ['', Validators.required],
        active: [true, Validators.required]
      }
      
    );

    if (!this.isAddMode) {
      this.roleService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.currentRole = x.element;
          this.form.patchValue(x.element);
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
      this.createRole();
    } else {
      this.updateRole();
    }
  }

  private createRole() {
    this.roleService
      .create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Rol agregado', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/roles'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  private updateRole() {
    
    this.roleService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Rol actualizado', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/roles'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  public onChangeRole(e: any) {
    // sincroniza el select con el Role Id
    this.form.controls['roleId'].patchValue(e.target.value);
  }

  activeToggle(): void {
    this.activeLabel = this.form.get('active')!.value ? 'Sí' : 'No';
  }

}

