import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {


  brands :Brand[]=[]
  colors:Color[]=[]
  selectedBrandId: number;
  selectedColorId: number;

  constructor(private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
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

  getSelectedBrand(brandId: number) {
    if (this.selectedBrandId == brandId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
  getSelectedColor(colorId: number) {
    if (this.selectedColorId == colorId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  clearCombobox(){
    this.selectedBrandId===-1
    this.selectedColorId===-1
  }

}
