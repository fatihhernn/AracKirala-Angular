export interface Rental{
    id?:number;
    paymentId?:number;
    customerId:number
    carId:number
    rentDate:Date
    returnDate:Date
}