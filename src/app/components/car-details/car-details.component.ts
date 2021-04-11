import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {

  carDetail: CarDetailDto ;


  carImages: CarImage[] = [];
  customers: Customer[] = [];
  customerId: Number;

  customerName: string;
  companyName: string;

  carId: number;
  carBrandName: string;
  carModelName: string;
  carDailyPrice: number;
  amountPaye: number = 0;

  rentDate!: Date;
  returnDate!: Date;

  carImageBasePath = 'https://localhost:44314';

  constructor(
    private carService: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private paymentServise: PaymentService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {



    this.activatedRoute.params.subscribe((params) => {

      if (params['carId']) {
        this.getCarDetailsById(params['carId']);
        this.getImagesByCarId(params['carId']);
      } else {
        this.getImagesByCarId(params['carId']);
      }
    });
    this.getCustomersDetails();

  }



  getCarDetailsById(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  sliderItemActive(index: number) {
    if (index === 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getCustomersDetails() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  createRentalRequest(carDetail: CarDetailDto) {
    if (this.customerId === undefined) {
      this.toastrService.warning('Müşteri bilgisini kontrol ediniz.');
      return;
    } else if (this.rentDate === undefined || !this.rentDate) {
      this.toastrService.warning('Alış Tarihi bilgisini kontrol ediniz.');
      return;
    } else if (this.returnDate === undefined || !this.returnDate) {
      this.toastrService.warning('Teslim Tarihi bilgisini kontrol ediniz.');
      return;
    } else if (this.returnDate < this.rentDate) {
      this.toastrService.error('Teslim Tarihi, Kiralama Tarihinde önce seçilemez.');
      return;
    } else if (this.returnDate === this.rentDate) {
      this.toastrService.error('Kiralama Tarihi ve Teslim Tarihi aynı olamaz.');
      return;
    } else {

        this.toastrService.info(
          'Bilgileriniz kontrol ediliyor.'
        );

    }

    this.carId = carDetail.carId;
    this.carBrandName = carDetail.brandName;
    this.carModelName = carDetail.description;
    this.carDailyPrice = carDetail.dailyPrice;

    let carToBeRented: Rental = {
      carId: this.carId,
      customerId: parseInt(this.customerId.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };

    //findex puanı kontrol et
    this.rentalService.checkFindexScore(carToBeRented).subscribe(response=>{
      this.toastrService.success(
        response.message.toString(),"Findeks puanını uygun"
      );


      //tarihlerin uygunluğunu kontrol et
      this.rentalService.checkCarStatus(carToBeRented).subscribe(
        (response) => {
          this.toastrService.success(
            response.message.toString(),
            'Tarihler Uygun'
          );

          var date1 = new Date(this.returnDate.toString());
          var date2 = new Date(this.rentDate.toString());
          var difference = date1.getTime() - date2.getTime();
          var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
          this.amountPaye = numberOfDays * this.carDailyPrice;

          if (this.amountPaye <= 0) {
            this.router.navigate(['/cars/' + this.carId]);
            this.toastrService.error(
              'Amount pay negatif'
            );
          } else {
            this.paymentServise.setRental(carToBeRented, this.amountPaye);

            setTimeout(() => {
              this.toastrService.success('Bilgileriniz onaylandı.');
            }, 1000);

            setTimeout(() => {
              this.toastrService.info(
                'Ödeme sayfasına yönlendiriliyorsunuz...'
              );
            }, 1000);

            setTimeout(() => {
              this.router.navigate(['/payments']);
            }, 3000);
          }
        },
        (error) => {
          setTimeout(() => {
            this.toastrService.error(
              'İstenilen Tarih için kiralama yapılamıyor',
              'Kiralama Başarısız'
            );
          }, 1000);

        }
      );


    },error => {
      setTimeout(() => {
        this.toastrService.error(
          'Findex puanınız uygun değil',
          'Kiralama başarısız'
        );
      }, 1000);
    })



  }
}
