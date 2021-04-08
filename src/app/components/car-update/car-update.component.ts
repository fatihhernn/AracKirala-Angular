import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CarService} from '../../services/car.service';
import {BrandService} from '../../services/brand.service';
import {ColorService} from '../../services/color.service';
import {Car} from '../../models/car';
import {Brand} from '../../models/brand';
import {Color} from '../../models/color';
import {CarDetailDto} from '../../models/carDetailDto';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {


  carUpdateForm : FormGroup;
  selectedCar: Car;

  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['carId']) {
        this.getCarById(parameter['carId']);
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    });
  }
  //normal car çağır
  getCarById(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.selectedCar = response.data;

      this.carUpdateForm.get('id').setValue(this.selectedCar.id);
      this.carUpdateForm.get('brandId').setValue(this.selectedCar.brandId);
      this.carUpdateForm.get('colorId').setValue(this.selectedCar.colorId);
      this.carUpdateForm.get('dailyPrice').setValue(this.selectedCar.dailyPrice);
      this.carUpdateForm.get('description').setValue(this.selectedCar.description);
      this.carUpdateForm.get('modelYear').setValue(this.selectedCar.modelYear);

      console.log(this.selectedCar);
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
    update(){
      if(this.carUpdateForm.valid){
        let updateCarModel=Object.assign({},this.carUpdateForm.value);
        console.log(updateCarModel);
        this.carService.update(updateCarModel).subscribe(
          (response) => {
            this.toastrService.success(response.message,"Güncelleme başarılı");
            this.toastrService.info("Anasayfaya yönlendiriliyorsunuz");
            setTimeout(() => {

              this.router.navigate(["/cars"])
            }, 1500);
          },
          (responseError) => {
            console.log(responseError);
            if(responseError.error.ValidationErrors.length>0){
              for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
                this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
              }
            }
          }
        );
      }
    }


  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      description:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required]
    })
  }

  cancel(){
    this.router.navigate(["/cars"])
  }

}
