import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpErrorService} from './httpError.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private playerAppearance = 'https://www.haloapi.com/profile/h5/profiles/{x}/appearance';

  // ? = optional. In this case: ?size = {x}
  private emblemImage = 'https://www.haloapi.com/profile/h5/profiles/{x}/emblem{?}';

  // {?} 1: size = {x}
  // {?} 2: crop = {x}
  private spartanImage = 'https://www.haloapi.com/profile/h5/profiles/{x}/spartan{?}{?}';

  constructor (private http: HttpClient, private errorService: HttpErrorService) {
  }

  getPlayerAppearance (playerName: string): Observable<any[]> {
    const requestCall = this.playerAppearance.replace('{x}', playerName);
    return this.http.get<any[]>(requestCall, {headers: {'Ocp-Apim-Subscription-Key' : 'f5e5f072dff34e3f9572e062552cfe0b' }}).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.errorService.handleError)
    );
  }

  getEmblemImage (playerName: string, size: string): Observable<any> {
    if (size) {
      size = '?size=' + size;
    }
    const requestCall = this.emblemImage.replace('{x}', playerName).replace('{?}', size);
    return this.http.get(requestCall, {
      responseType: 'blob',
      headers: {
        'Ocp-Apim-Subscription-Key' : 'f5e5f072dff34e3f9572e062552cfe0b',
        // 'Access-Control-Allow-Origin': '*'
      }}).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getSpartanImage (playerName: string, size: string, crop: string): Observable<any> {
    if (size) {
      size = '?size=' + size;
    }
    if (crop) {
      crop = size ? '&crop=' + crop : '?crop=' + crop;
    }
    const requestCall = this.spartanImage.replace('{x}', playerName).replace('{?}', size).replace('{?}', crop);
    return this.http.get(requestCall, {
      responseType: 'blob',
      headers: {
        'Ocp-Apim-Subscription-Key' : 'f5e5f072dff34e3f9572e062552cfe0b',
        // 'Access-Control-Allow-Origin': '*'
      }}).pipe(
      catchError(this.errorService.handleError)
    );
  }
}
