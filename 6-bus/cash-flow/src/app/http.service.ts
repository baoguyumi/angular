import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BusService } from 'app/bus.service';
import { environment } from './../environments/environment';

@Injectable()
export class HttpService extends Http {
  public apiUrl = environment.apiUrl;
  private authorization = '';

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private bus: BusService
  ) {
    super(backend, defaultOptions);
    this.subscribeToTokenChanges();
  }

  request(request: string | Request, options?: RequestOptionsArgs): Observable<any> {
    this.configureRequest(request, options);
    return this.interceptResponse(request, options);
  }
  private configureRequest(request: string | Request, options: RequestOptionsArgs) {
    if (typeof request === 'string') {
      request = this.excludeAssets(request);
      this.setHeaders(options);
    } else {
      request['url'] = this.excludeAssets(request['url']);
      this.setHeaders(request);
    }
  }
  private interceptResponse(url: string | Request, options: RequestOptionsArgs): Observable<any> {
    const observableRequest = super
      .request(url, options)
      .catch(this.onCatch.bind(this));
    return observableRequest;
  }
  private excludeAssets(currentUrl) {
    if (currentUrl.includes('/assets/')) {
      return currentUrl;
    } else {
      return this.apiUrl + currentUrl;
    }
  }
  private setHeaders(request: Request | RequestOptionsArgs) {
    const headers = request.headers;
    headers.set('Authorization', this.authorization);
  }
  private onCatch(res) {
    if (this.isSecurityError(res)) {
      this.bus.emitSecurityError(res);
    } else {
      this.bus.emitHttpError(res);
    }
    return Observable.throw(res);
  }
  private isSecurityError(res) {
    return res.status === 401 || res.status === 419;
  }

  private subscribeToTokenChanges() {
    this.bus
      .getUserToken$()
      .subscribe(token => this.authorization = 'Bearer ' + token);
  }
}
