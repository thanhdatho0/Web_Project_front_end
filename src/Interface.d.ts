export interface NavBarCategoryTitle {
    name: string;
}

export interface Color {
    colorId : number;
    hexaCode : string;
    name : string
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