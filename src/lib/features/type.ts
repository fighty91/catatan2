export interface Contact {
  id: string;
  name: string;
  nameLower: string;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  [key: string]: any; // Untuk properti tambahan lainnya
}