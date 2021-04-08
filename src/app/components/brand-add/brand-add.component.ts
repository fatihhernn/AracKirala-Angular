import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validator,Validators} from '@angular/forms';
import{BrandService} from '../../services/brand.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup

  constructor(private router: Router,private formBuilder:FormBuilder,private brandService:BrandService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAddBrand()
  }

  createAddBrand(){
    this.brandAddForm=this.formBuilder.group({
      description:["",Validators.required]
    })
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel=Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.router.navigate(["/cars"])
      },responseError =>{
        if (responseError.error.Errors.length>0 ){
          for (let i=0;responseError.error.Errors.length;i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz eksik!","Dikkat")
    }
  }
  back(){
    this.router.navigate(["/brands/details"])
  }

}
