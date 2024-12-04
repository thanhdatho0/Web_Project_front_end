export interface NavBarCategoryTitle {
    name: string;
}

// export interface Color {
//     colorId : number;
//     hexaCode : string;
//     name : string
// }

export interface Product {
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
  export interface ProductCart {
    productId: number;
    name: string;
    price: number;
    color: string;   
    imgUrl: string;
    imgAlt: string;
    size: string;    
    quantity: number;
  }
  
export interface Size {
    sizeId: number;
    sizeValue: string;
  }
  
  interface Color {
    colorId: number;
    hexaCode: string;
    name: string;
    images: Image[];
  }
  
export interface Image {
    imageId: number;
    url: string;
    alt: string;
    productId: number;
    colorId: number;
  }

export interface Category{
    categoryId : number;
    name : string;
    targetCustomerId : number;
    subcategories : Subcategory[];
    navigate: string;
  }

export interface Subcategory {
    subcategoryId: number;
    subcategoryName : string;
    description : string;
    products: Product[];
    categoryId: number;
    navigate: string;
}

export interface TargerCustomer {
  targetCustomerId : number;
  targetCustomerName : string;
  url : string;
  alt : string;
  categories : Category[];
}

export interface RegisterData {
  userName: string;  // Username (email or username)
  passWord: string;  // Password
  firstName: string; // First Name
  lastName: string;  // Last Name
  gender: string;    // Gender ("Nam", "Nữ", "Khác")
  phoneNumber: string; // Phone number
  address: string;    // Address
  dob: string;        // Date of birth (format: 'YYYY-MM-DD')
  email: string; 
}
