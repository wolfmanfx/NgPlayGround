import { HttpHeaders } from "@angular/common/http";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { nextTick } from "process";
import { Observable, throwError } from "rxjs";
import { finalize, tap } from "rxjs/operators";

export class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const newReq = req.clone({
            headers: new HttpHeaders({
                'workshop': 'angular'
            })
        });

        //if(newReq.params.has('from') && newReq.params.get('from') === 'Graz') {
        //    return throwError('Not allowed');
        //}
        const started = Date.now();
        return next.handle(newReq).pipe(
            tap(x => console.log(x)),
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} "${req.urlWithParams}" in ${elapsed} ms.`;
                console.log(msg);
            })
        );
    }

}