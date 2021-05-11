import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '@app/_models';
import { AlertService } from '@app/_services';
import { CityService } from '@app/_services/city.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-city-editor',
  templateUrl: './city-editor.component.html'
})
export class CityEditorComponent implements OnInit {
  // citiesCollection!: City[];
  citiesCollection = [
{
"name":"Bovril", "code": 42829
},
{
"name":"Caseros", "code": 42866
},
{
"name": "Chajari", "code": 42881
},
{
"name": "Colón", "code": 43437
},
{
"name":"Colonia San Justo", "code": 43326
},
{
"name": "Colonia Santa Maria", "code": 43350
},
{
"name":"Concepcion del Uruguay", "code": 42922
},
{
"name": "Concordia", "code": 42923
},   
{
"name":"Crespo", "code": 42940
},
{
"name":"Federacion", "code": 42987
},
{
"name":"Federal", "code": 42988
},
{
"name":"Gualeguay", "code": 43033
},
{
"name": "Gualeguaychú", "code": 43034
},
{
"name": "La Paz", "code": 43095
},
{
"name":"Larroque", "code": 43115
},
{
"name": "Los Conquistadores", "code": 43145
},
{
"name": "Paraná", "code": 43214
},
{
"name": "San Gustavo", "code": 43317
},
{
"name": "San Jose de Feliciano", "code": 43321
},
{
"name":"Macia", "code": 43157
},
{
"name":"Santa Ana", "code": 43340
},

{
"name":"Santa Elena", "code": 43344
},

{
"name":"Sauce de luna", "code": 43364
},

{
"name":"Segui", "code": 43366
},
{
"name":"Tabossi", "code": 43376
},
{
"name":"Ubajay", "code": 43401
},
{
"name":"Victoria", "code": 43416
},
{
"name":"Villaguay", "code": 43464
},
{
"name":"Villa elisa", "code": 43437
},
{
"name":"Villa Hernandarias", "code": 43443
}
];

  currentCity!: City;
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
    private cityService: CityService,
    private alertService: AlertService,
    ) {
      
    }

     ngOnInit() {
      // Hardcodeo las ciudades a elegir al inicio de la clase
      //  this.cityService.getAll().subscribe(pagedCities => {
      //   try {
      //     this.citiesCollection = pagedCities.listElements.filter(c => c.active == true).sort((a, b) => a.name.localeCompare(b.name));
      //   } catch (error) {
      //     console.log(pagedCities.message);
      //   }
      // });

      this.id = this.route.snapshot.params['id'];
      this.isAddMode = this.id <= 0;
  
      this.form = this.formBuilder.group(
        {
          cityId: ['0'],
          name: ['', Validators.required],
          code: ['', Validators.required],
          active: [true, Validators.required]
        }
        
      );
  
      if (!this.isAddMode) {
        this.cityService
          .getById(this.id)
          .pipe(first())
          .subscribe((x) => {
            this.currentCity = x.element;
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
      this.createCity();
    } else {
      this.updateCity();
    }
  }

  private createCity() {
    this.cityService
      .create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Ciudad agregada', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/cities'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  private updateCity() {
    
    this.cityService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Ciudad actualizada', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/cities'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  activeToggle(): void {
    this.activeLabel = this.form.get('active')!.value ? 'Sí' : 'No';
  }

  cityChange(e: any) {
    let id: string = e.target.value;
  };

}
