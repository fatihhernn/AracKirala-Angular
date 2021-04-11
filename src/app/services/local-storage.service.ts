import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  loadObject(key:string,value:string){
    localStorage.setItem(key,value)
  }
  getObject(key:string){
    if (localStorage.getItem(key)){
      return localStorage.getItem(key)
    }
    return null;
  }

  deleteObject(key:string){
    localStorage.removeItem(key);
  }
}
