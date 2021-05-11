import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '@app/_models';
import { Location } from '@app/_models/location';
import { AlertService } from '@app/_services';
import { CityService } from '@app/_services/city.service';
import { LocationService } from '@app/_services/location.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.component.html'
})
export class LocationEditorComponent implements OnInit {
    citiesCollection!: City[];

  currentLocation!: Location;
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
    private locationService: LocationService,
    private cityService: CityService,
    private alertService: AlertService,
    ) {
      
    }

   ngOnInit() {
    this.cityService.getAll().subscribe(paged => {
      this.citiesCollection = paged.listElements;
    });

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = this.id <= 0;

    this.form = this.formBuilder.group(
      {
        locationId: ['0'],
        locationName: ['', Validators.required],
        fullAddress: ['', Validators.required],
        note: ['', Validators.required],
        cityId: ['', Validators.required],
        active: [true, Validators.required]
      }

      // tours!: Tour[];
      // attractions!: Attraction[];
      // photos!: Photo[];
    );

    if (!this.isAddMode) {
      this.locationService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.currentLocation = x.element;
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

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createLocation();
    } else {
      this.updateLocation();
    }
  }

  private createLocation() {
    this.locationService
      .create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Localidad agregada', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/locations'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  private updateLocation() {
    
    this.locationService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Localidad actualizada', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/locations'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  public onChangeRole(e: any) {
    // sincroniza el select con el Role Id
    this.form.controls['locationId'].patchValue(e.target.value);
  }

  activeToggle(): void {
    this.activeLabel = this.form.get('active')!.value ? 'Sí' : 'No';
  }

  cityChange(e: any) {
    let id: string = e.target.value;
  };
}
