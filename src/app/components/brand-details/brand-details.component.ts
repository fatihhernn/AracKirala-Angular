import { Component, OnInit } from '@angular/core';
import {BrandService} from '../../services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Brand} from '../../models/brand';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {

  brandDetails:Brand[];
  dataLoaded:Boolean;

  brand:Brand;

  brandAddForm: FormGroup;

  constructor(private router: Router,private brandService:BrandService,private formBuilder:FormBuilder,private activatedRoute: ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]){
        this.createBrandUpdateForm()
        this.getCurrentBrand(params["brandId"])
      }
    })
    this.getAll()
  }

  getAll(){
    this.brandService.getBrands().subscribe((response=>{
      console.log(response.data)
      this.brandDetails=response.data;
      this.dataLoaded=true;
    }))
  }


  getCurrentBrand(brandId: number){
    this.brandService.getBrandById(brandId).subscribe(response =>{
      this.brandDetails = response.data;
      this.brandAddForm.get('id')?.setValue(this.brand.id);
      this.brandAddForm.get('description')?.setValue(this.brand.description);
    });
  }

  createBrandUpdateForm(){
    this.brandAddForm = this.formBuilder.group({
      id: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  delete(){

  }



  add(){
    this.router.navigate(["/brands/add"])
  }
  edit(){

  }

  back(){
    this.router.navigate(["/cars"])
  }


}
