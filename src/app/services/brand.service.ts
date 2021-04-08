import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Brand } from '../models/brand';
import {ResponseModel} from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44314/api';

  constructor(private httpClient: HttpClient) { }

   getBrands():Observable<ListResponseModel<Brand>> {
      let newPath=this.apiUrl+"/brand/getall"
      return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }

  add(brand: Brand):Observable<ResponseModel> {
    let newPath=this.apiUrl+"/brand/add"
    return  this.httpClient.post<ResponseModel>(newPath,brand)
  }
  getBrandById(brandId: number): Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"/brand/getbyid"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
}
