export interface ProductModel{
    productID : number,
    productName : string,
    quantityPerUnit : string,
    unitPrice : number,
    unitsInStock : number,
    unitsOnOrder : number,
    reorderLevel : number,
    discontinued : boolean,
    categoryName : string,
    description : string,
    supplier : string,
    contactName : string,
    contactTitle : string,
}

export interface Conditions extends SearchForm{
    Category: Number,
    Supplier: Number,
    Price: Number,
    Discontinued: Boolean,
    ProductName: String,
}

interface SearchForm{
    page: number,
    pageSize: number
}