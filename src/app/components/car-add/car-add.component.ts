import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  constructor(private formBuilder: FormBuilder,private carService:CarService,private toastrService:ToastrService) {

  }

  ngOnInit(): void {
    this.createCarAdd()
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
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
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

}
