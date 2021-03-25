import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'brandPipe',
})
export class BrandPipePipe implements PipeTransform {
  transform(value: CarDetailDto[], txtBrand: string): CarDetailDto[] {
    txtBrand = txtBrand ? txtBrand.toLowerCase() : '';
    return txtBrand
      ? value.filter(
          (b: CarDetailDto) => b.brandName.toLowerCase().indexOf(txtBrand) !== -1
        )
      : value;
  }
}
