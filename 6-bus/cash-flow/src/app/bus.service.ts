import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusService {

  private message$ = new Subject<string>();
  private securityErr$ = new Subject<string>();
  private userToken$ = new Subject<string>();

  constructor() { }

  getMessage$(): Observable<string> {
    return this.message$.asObservable();
  }
  getSecurityErr$(): Observable<string> {
    return this.securityErr$.asObservable();
  }
  getUserToken$(): Observable<string> {
    return this.userToken$.asObservable();
  }

  emit(message: string) {
    this.message$.next(message);
  }
  emitHttpError(error) {
    const errMsg = this.getMessageFromError(error);
    this.emit(errMsg);
  }
  emitSecurityError(error) {
    const errMsg = this.getMessageFromError(error);
    console.log('securityErr:', errMsg);
    this.emit(errMsg);
    this.securityErr$.next(errMsg);
  }
  emitUserToken(userToken: string) {
    console.log('emitUserToken:', userToken);
    this.userToken$.next(userToken);
  }

  private getMessageFromError(error) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = this.getMessageFromResponse(error);
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
  }
  private getMessageFromResponse(error) {
    const body = error.json() || '';
    const errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
    return errMsg;
  }


}
