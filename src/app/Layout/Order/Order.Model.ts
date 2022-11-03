export interface OrderModel {
    orderID : number,
    orderDate : Date,
    customerID : string,
    shipName : string,
    shipper : number,
    shippedDate : Date,
    shipRegion : string,
    shipCountry : string,
    shipCity : string,
    shipPostalCode : string,
    shipAddress : string,
    employee : string,
    jobTitle : string,
    region : string,
    country : string,
    city : string,
    postalCode : string,
    address : string
}

interface SearchForm{
    page: number,
    pageSize: number
}

export interface ConditionModel extends SearchForm{
    OrderDate: Date | undefined,
    Shipper: number,
}