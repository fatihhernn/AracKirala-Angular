import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {

  rentalDetails: RentalDetailDto[] = [];
  dataLoaded = false;

  constructor(private rentalService: RentalService,private router:Router) {}

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }

  back(){
    this.router.navigate(["/cars"])
  }


}
