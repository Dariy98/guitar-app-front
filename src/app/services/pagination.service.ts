import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(
    private http: HttpClient
  ) {
  }

  public testPagination(link: string) {
    const url = `${environment.serverUrl}${link}`;
    console.log({url});
    return this.http.get(url);
  }
}
