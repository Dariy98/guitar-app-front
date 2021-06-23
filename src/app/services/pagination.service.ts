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

  public getPaginationData(link: string) {
    const url = `${environment.serverUrl}${link}`;
    return this.http.get(url);
  }
}
