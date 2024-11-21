// export interface Product {
//     productId: number;
//     title: string;
//     price: number;
//     category: string;
//     description: string;
//     image: string;
//     navigate: string;
// }

export interface NavBarCategoryTitle {
    name: string;
}

export interface Color {
    hexaCode : string;
}

interface Product {
    productId: number;
    name: string;
    categoryName: string;
    price: number;
    description: string;
    cost: number;
    stock: number;
    isDeleted: boolean;
    categoryId: number;
    providerId: number;
    sizes: Size[];
    colors: Color[];
    image : string;
    navigate: string;

  }
  
  interface Size {
    sizeId: number;
    sizeValue: string;
  }
  
  interface Color {
    colorId: number;
    hexaCode: string;
    name: string;
    images: Image[];
  }
  
  interface Image {
    imageId: number;
    url: string;
    alt: string;
    productId: number;
    colorId: number;
  }

  interface Category{
    categoryId : number;
    name : string;
    description : string;
    products : Product[]
  }