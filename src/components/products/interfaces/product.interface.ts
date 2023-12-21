export interface Product {
    _id: string;
    name: string;
    description: String;
    price: Number;
    stock: Number;
}

export interface ProductWithoutId extends Omit<Product, '_id'>{}
