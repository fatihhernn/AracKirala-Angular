import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44314/api/"

  constructor(private httpClient:HttpClient) { }


  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"CarImage/getimagesbycarid?id="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
