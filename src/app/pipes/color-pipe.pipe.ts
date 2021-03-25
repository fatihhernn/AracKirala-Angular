import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(value: CarDetailDto[], txtColor: string): CarDetailDto[] {
    txtColor = txtColor ? txtColor.toLowerCase() : '';
    return txtColor
      ? value.filter(
          (b: CarDetailDto) => b.colorName.toLowerCase().indexOf(txtColor) !== -1
        )
      : value;
  }

}
