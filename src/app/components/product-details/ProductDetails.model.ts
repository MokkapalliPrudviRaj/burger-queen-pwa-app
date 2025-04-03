export interface ProductDetails {
    id: number;
    name: string;
    price: number;
    stock: number;
    type: string;
    description: string;
    mainImage: string;
    thumbnails?: string[];
}
