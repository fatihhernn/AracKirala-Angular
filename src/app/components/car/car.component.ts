import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  carDetails:CarDetailDto[]=[]
  carImages:CarImage[]=[]

  dataLoaded = false;

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getAllCarsByBrandId(params["brandId"])
      }
      else if(params["colorId"]){
        this.getAllCarsByColorId(params["colorId"])
      }
      else{
        this.getCars()
       
      }
    })
    
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded = true;
    })
  }


  getAllCarsByBrandId(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded = true;
    })
  }

  
  getAllCarsByColorId(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded = true;
    })
  }


}
