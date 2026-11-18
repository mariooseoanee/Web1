export interface Producto {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    thumbnail: string;
}

export interface RespuestaProductos {
    products: Producto[];
    total: number;
    skip: number;
    limit: number;
}