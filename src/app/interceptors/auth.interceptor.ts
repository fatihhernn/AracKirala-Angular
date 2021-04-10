import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


//bütün http isteklerini intercept edecek kısımdır
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  //request : post işlemi yapmak için => bilgileri girip basmamız
  //next : gönderilen istekler ilave edilen alanlar => Header gibi, working-period-id gibi

  //request içerisine 1 tane header koyarsak, bütün isteklerin başına authorization Header koyar gönderir

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=localStorage.getItem("token")
    let newRequest:HttpRequest<any>;
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer"+token)
    })
    return next.handle(request);
  }
}

//error handling
