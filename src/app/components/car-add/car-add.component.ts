import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {Brand} from '../../models/brand';
import {BrandService} from '../../services/brand.service';
import {ColorService} from '../../services/color.service';
import {Color} from '../../models/color';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  brands: Brand[] = [];
  colors: Color[]=[];

  constructor(private router:Router,private colorService:ColorService, private brandService: BrandService,private formBuilder: FormBuilder,private carService:CarService,private toastrService:ToastrService) {

  }

  ngOnInit(): void {
    this.createCarAdd()
    this.getBrands();
    this.getColors();
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



   createCarAdd(){
      this.carAddForm=this.formBuilder.group({
        brandId:["",Validators.required],
        colorId:["",Validators.required],
        modelYear:["",Validators.required],
        description:["",Validators.required],
        dailyPrice:["",Validators.required]
      })
  }
  add(){
    if (this.carAddForm.valid){
      let carModel=Object.assign({},this.carAddForm.value)
      console.log(carModel)
      this.carService.add(carModel).subscribe(response=>{

        this.toastrService.success(response.message,"Kayıt Başarılı")

        setTimeout(() => {
          this.toastrService.info(
            'Ana sayfaya yönlendiriliyorsunuz'
          );
        }, 1000);

        setTimeout(() => {
          this.router.navigate(['/cars']);
        }, 3000);



      },responseError=>{
        if(responseError.error.Errors.length>0){
          //console.log(responseError.error.Errors)
          for (let i=0;i<responseError.error.Errors.length;i++)
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası!")
        }

      })

    }else {
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
  }

  back(){
    this.router.navigate(["/cars"])
  }


}
