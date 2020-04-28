import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpErrorService} from './httpError.service';

@Injectable({
  providedIn: 'root'
})
export class Halo5Service {
  private productUrl = 'https://www.haloapi.com/profile/h5/profiles/gygenthe2nd/appearance';

  constructor (private http: HttpClient, private errorService: HttpErrorService) {

  }

  getSpartan(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl, {headers: {'Ocp-Apim-Subscription-Key' : 'f5e5f072dff34e3f9572e062552cfe0b' }}).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.errorService.handleError)
    );
  }
}
