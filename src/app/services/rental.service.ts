import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44314/api/Rental';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + "/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl);
  }

  
  checkCarStatus(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/checkcarstatus';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
  add(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
