import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpErrorService} from './httpError.service';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private medals = 'https://www.haloapi.com/metadata/h5/metadata/medals';

  constructor (private http: HttpClient, private errorService: HttpErrorService) {
  }

  getMedals (): Observable<any[]> {
    const requestCall = this.medals;
    return this.http.get<any[]>(requestCall, {headers: {'Ocp-Apim-Subscription-Key' : 'f5e5f072dff34e3f9572e062552cfe0b' }}).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.errorService.handleError)
    );
  }
}
