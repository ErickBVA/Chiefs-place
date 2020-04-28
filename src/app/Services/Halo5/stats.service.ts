import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpErrorService} from './httpError.service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private playerCommendations = 'https://www.haloapi.com/stats/h5/players/{x}/commendations';

  constructor (private http: HttpClient, private errorService: HttpErrorService) {
  }

  getPlayerCommendations (playerName: string): Observable<any[]> {
    const requestCall = this.playerCommendations.replace('{x}', playerName);
    return this.http.get<any[]>(requestCall, {headers: {'Ocp-Apim-Subscription-Key' : 'f5e5f072dff34e3f9572e062552cfe0b' }}).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.errorService.handleError)
    );
  }
}
