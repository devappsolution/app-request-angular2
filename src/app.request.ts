import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppRequest {
  constructor(private http: Http) { }

  json(url: string, body: Object): Observable<any> {

    let headers = new Headers({ 'Content-Type': "application/json" });

    return this.http.post(url, body, { headers: headers })
      .map(this.responseHandler)
      .catch(this.handleError);
  }

  private responseHandler(response: Response) {
    let body: any;

    if (response.text() === '')
      body = response.text();
    else
      body = response.json();

    return body || {};
  }

  private handleError(error: Response | any) {

    let errMsg: string[];
    let erros: string = "";

    if (error instanceof Response) {
      if (error.status == 403) {
        errMsg = [error.text()];
      }
    }

    return Observable.throw(erros);
  }
}
