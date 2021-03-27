import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carDetail: CarDetailDto={brandId:0,brandName:"",carId:0,colorId:0,colorName:"",dailyPrice:0,description:""};
  carImages: CarImage[] = [];

  _isCarRented :boolean;

  carImageBasePath = "https://localhost:44314";
  
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carImageService:CarImageService,private toastrService:ToastrService) { }

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsById(params["carId"]);
        this.getImagesByCarId(params["carId"]);
      } else {
        this.getImagesByCarId(params["carId"]);
      }
    })    

  }
  getCarDetailsById(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response=>{
      this.carDetail = response.data[0];
    })
  }

  getImagesByCarId(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data;
    })
  }

  sliderItemActive(index: number){
    if(index === 0){
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  } 

 
  isCarRented(carId:number){
    this.carService.isCarRented(carId).subscribe(response=>{

      this._isCarRented=response.success

      if (this._isCarRented===true) {
        console.log("bu araba kiralanabilr")
       
      }
      
    },responseError=>{
      console.log(responseError.error)
      this.toastrService.error(responseError.error)
    })
  }

}