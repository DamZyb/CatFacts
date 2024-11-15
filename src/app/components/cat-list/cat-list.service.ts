import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CatFacts} from './cat-fact';

@Injectable({
  providedIn: 'root'
})
export class CatFactService {

  constructor(private httpClient: HttpClient) {
  }

  getText(): Observable<CatFacts> {
    return this.httpClient.get<CatFacts>('https://meowfacts.herokuapp.com/')

  }
}
