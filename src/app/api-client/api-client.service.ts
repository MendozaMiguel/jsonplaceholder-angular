import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(public http: HttpClient ) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  get(path: string) {
      return this.http.get(path).pipe(map(this.extractData));
    }
}
