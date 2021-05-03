import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchAll } from 'rxjs/operators';

import { AlertService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor 
{
    constructor(private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let error = err.error?.message || err.statusText;
            if (error == "Unauthorized") {
                error = "No Autorizado";
            }
            if (error==" <Username or password is incorrect") {
                error = ("Usuario y/o claves incorrecto")
                
                
            }
            this.alertService.error(error);
            console.error(err);
            return throwError(error);
        }))
    }
}