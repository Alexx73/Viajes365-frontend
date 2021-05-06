import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create mock backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { NavbarComponent } from './_components/navbar.component';
import { TermsAndConditionsComponent } from './home/terms-and-conditions/terms-and-conditions.component';
import { ApiclimaComponent } from './_components/apiclima.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxFilesizeModule } from 'ngx-filesize';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxFilesizeModule,
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    NavbarComponent,
    TermsAndConditionsComponent,
    ApiclimaComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
