import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';

import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import {CarAddComponent} from './components/car-add/car-add.component';
import {BrandAddComponent} from './components/brand-add/brand-add.component';
import {BrandDetailsComponent} from './components/brand-details/brand-details.component';
import {CarUpdateComponent} from './components/car-update/car-update.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"login",component:LoginComponent},
  {path:"cars/add",component:CarAddComponent},

  {path:"brands/add",component:BrandAddComponent},
  {path:"brands/details",component:BrandDetailsComponent},

  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"cars/update/:carId",component:CarUpdateComponent},



  {path:"cardetail/:carId", component:CarDetailsComponent},

  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},

  {path:"rentals", component:RentalComponent},
  {path:"payments", component:PaymentComponent},
  {path:"customers", component:CustomerComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
