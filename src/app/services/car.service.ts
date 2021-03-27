import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root',
})

export class CarService {
  apiUrl = 'https://localhost:44314/api';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + '/Car/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  getCarByCarId(carId:number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + '/Car/get-car-details-by-id?carId='+carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + '/Car/get-by-brand-id?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + '/Car/get-by-color-id?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  getCarsByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl +'/Car/get-car-details-by-color-brand?brandId='+brandId+'&colorId='+colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  isCarRented(carId:number){
    let newPath=this.apiUrl+'/Car/isCarRented?carId='+carId
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
