import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService, TopicService } from '@app/_services';
import { Topic, User } from '@app/_models';

@Component({
  selector: 'app-topic-editor',
  templateUrl: './topic-editor.component.html',
})
export class TopicEditorComponent implements OnInit {
  statuses: string[] = ['aprobado', 'pendiente', 'desaprobado'];
  currentTopic!: Topic;
  currentUser!: User;
  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  activeLabel = 'No';
  pinnedLabel = 'No';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {
    this.currentUser = this.accountService.userValue;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = this.id <= 0;

    if (this.isAddMode) {
      this.currentTopic = new Topic();
    }

    this.form = this.fb.group({
      topicid: ['0'],
      name: ['', Validators.required],
      summary: ['', Validators.required],
      status: ['aprobado', Validators.required],
      pinned: [false, Validators.required],
      active: [true, Validators.required],
      userid: [this.currentUser.userId.toString(), Validators.required],
    });

    if (!this.isAddMode) {
      this.topicService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.currentTopic = x.element;
          this.form.patchValue(x.element);
          this.form.controls['topicid'].patchValue(this.currentTopic.topicId);
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
      this.createTopic();
    } else {
      this.updateTopic();
    }
  }

  private createTopic() {
    this.topicService
      .create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Tema agregado', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/forum'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  private updateTopic() {
    this.topicService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Tema actualizado', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/forum'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  activeToggle(): void {
    this.activeLabel = this.form.get('active')!.value ? 'Sí' : 'No';
  }

  pinnedToggle(): void {
    this.pinnedLabel = this.form.get('active')!.value ? 'Sí' : 'No';
  }

  onChangeStatus(e: any) {
    // todo
  }
}
