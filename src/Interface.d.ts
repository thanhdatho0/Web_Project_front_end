export interface NavBarCategoryTitle {
    name: string;
}

// export interface Color {
//     colorId : number;
//     hexaCode : string;
//     name : string
// }

// export interface Product {
//     productId: number;
//     name: string;
//     price: number;
//     description: string;
//     cost: number;
//     stock: number;
//     isDeleted: boolean;
//     subCategoryId: number;
//     providerId: number;
//     sizes: Size[];
//     colors: Color[];
//     navigate: string;
//   }
export interface Product {
  productId: number; 
  name: string; 
  price: number; 
  description?: string; 
  cost: number;
  quantity: number; 
  inStock: number; 
  discountPercentage: number; 
  isDeleted: boolean; 
  createdAt: string; 
  updatedAt: string;
  images: Image[]; 
  inventories: Inventory[]; 
  providerId: number; 
  provider?: Provider;
  subcategoryId: number; 
  subcategory?: Subcategory;
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
  export interface OrderRequest {
    employeeId: number | null;
    customerId: number;
    orderNotice: string;
    orderDetails: OrderDetail[];
  }
  
  export interface OrderDetail {
    productId: number;
    colorId: number;
    sizeId: number;
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

interface EmailRequest {
  email: string;
  username: string;
}

interface Account {
  customerId : number
  avatar : string;
  address: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName : string;
  male: boolean;
  phoneNumber: string;
  fullName : string;
}

interface User {
  isAuthenticated: boolean;
  accessToken: string;
  username : string;
}
