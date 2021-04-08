import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  carIdToDelete: Car;

  carImages:CarImage[]=[]



  selectedCar:Car;

  carUpdateForm:FormGroup;

  dataLoaded = false;
  txtColor=""
  txtBrand=""

  constructor(private router:Router,private toastrService:ToastrService,private formBuilder:FormBuilder,private carService:CarService,private activatedRoute:ActivatedRoute,private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]&& !params["colorId"]) {
        this.getAllCarsByBrandId(params["brandId"])
      }
      else if(params["colorId"] && !params["brandId"]){
        this.getAllCarsByColorId(params["colorId"])
      }
      else if (params["brandId"]&&params["colorId"]) {
        this.getCarsByBrandAndColor(params["brandId"],params["colorId"])
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

  getCarsByBrandAndColor(brandId:number, colorId: number){
    this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response => {
      this.carDetails = response.data,
      this.dataLoaded=true;
    })
  }

  setCarToDelete(carId: number) {
    this.carIdToDelete = Object.assign({ id: carId });
  }


  deleteCar() {
    console.log( this.carIdToDelete.id)
    this.carService.carDelete(this.carIdToDelete.id).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['cars']));
      },
      (responseError) => {
          if (responseError.error.Errors.length>0){
            for (let i;i<responseError.error.Errors.length;i++)
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası!")

          }
      }
    );
  }


}
