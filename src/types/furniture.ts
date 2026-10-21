export type WoodType = 
  | 'Kayu Jati Perhutani (TPK Grade A)'
  | 'Kayu Sungkai Solid'
  | 'Kayu Suar / Trembesi Alami'
  | 'Kayu Mahoni Oven Grade A';

export type FurnitureCategory = 
  | 'semua'
  | 'ruang-tamu'
  | 'ruang-makan'
  | 'kamar-tidur'
  | 'ruang-kerja'
  | 'dekorasi';

export type FinishOption = 
  | 'Natural Matte (Doff Halus)'
  | 'Walnut Brown (Hangat Elegan)'
  | 'Bleached Teak (Scandinavian Light)'
  | 'Deep Charcoal Satin';

export interface Product {
  id: string;
  name: string;
  category: FurnitureCategory;
  price: number;
  woodType: WoodType;
  dimensions: string;
  weightEstKg: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  stock: number;
  isPreOrder: boolean;
  preOrderDays?: number;
  isFeatured?: boolean;
  finishingOptions: FinishOption[];
  joineryDetails: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: FinishOption;
  customNote?: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  items: {
    productId: string;
    productName: string;
    finish: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: 'whatsapp' | 'transfer_bca' | 'transfer_mandiri' | 'dp_50';
  orderStatus: 'Menunggu Konfirmasi' | 'Proses Pertukangan' | 'Finishing & QC' | 'Dalam Pengiriman' | 'Selesai';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  sellerWhatsApp: string;
  workshopAddress: string;
  bankAccountBCA: string;
  bankAccountMandiri: string;
  shippingNote: string;
}
