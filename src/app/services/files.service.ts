import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public sendFile(formData) {
    return this.http.post(`${environment.serverUrl}/files`, formData, {
        reportProgress: true,
        // responseType: 'arraybuffer',
        observe: 'events'
      }
    );
  }
}
