import { CartItem, Product, StoreSettings } from '../types/furniture';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateOrderId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FN-${code}`;
}

export function buildWhatsAppOrderUrl(
  items: CartItem[],
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  },
  totalAmount: number,
  settings: StoreSettings,
  orderId: string
): string {
  const cleanPhone = settings.sellerWhatsApp.replace(/[^0-9]/g, '');
  
  let message = `*PESANAN MEBEL BARU — ${settings.storeName.toUpperCase()}*\n`;
  message += `No. Pesanan: #${orderId}\n`;
  message += `Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}\n\n`;
  
  message += `*DATA PEMESAN:*\n`;
  message += `Nama: ${customer.name}\n`;
  message += `No. HP: ${customer.phone}\n`;
  message += `Alamat Pengiriman: ${customer.address}, ${customer.city}\n`;
  if (customer.notes) {
    message += `Catatan: ${customer.notes}\n`;
  }
  
  message += `\n*DAFTAR PRODUK:*\n`;
  items.forEach((item, idx) => {
    message += `${idx + 1}. *${item.product.name}*\n`;
    message += `   - Jumlah: ${item.quantity} unit\n`;
    message += `   - Finishing: ${item.selectedFinish}\n`;
    message += `   - Kayu: ${item.product.woodType}\n`;
    message += `   - Subtotal: ${formatRupiah(item.product.price * item.quantity)}\n`;
  });
  
  message += `\n*TOTAL PESANAN: ${formatRupiah(totalAmount)}*\n\n`;
  message += `Halo Admin ${settings.storeName}, saya ingin konfirmasi pesanan di atas dan perkiraan ongkos kirim ke alamat saya. Mohon info nomor rekening dan ketersediaan barang. Terima kasih!`;
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildCustomOrderWhatsAppUrl(
  details: {
    itemType: string;
    woodType: string;
    dimensions: string;
    finish: string;
    estimatedPrice: number;
    notes: string;
  },
  settings: StoreSettings
): string {
  const cleanPhone = settings.sellerWhatsApp.replace(/[^0-9]/g, '');
  
  let message = `*KONSULTASI PESANAN MEBEL KUSTOM — ${settings.storeName.toUpperCase()}*\n`;
  message += `Halo Pengrajin ${settings.storeName}, saya ingin memesan mebel kustom dengan rincian berikut:\n\n`;
  message += `• Jenis Perabot: ${details.itemType}\n`;
  message += `• Jenis Kayu: ${details.woodType}\n`;
  message += `• Ukuran Dimensi: ${details.dimensions}\n`;
  message += `• Pilihan Finishing: ${details.finish}\n`;
  message += `• Estimasi Hitungan Sistem: ${formatRupiah(details.estimatedPrice)}\n`;
  if (details.notes) {
    message += `• Catatan / Sketsa: ${details.notes}\n`;
  }
  message += `\nMohon feedback mengenai kelayakan konstruksi dan jadwal produksinya. Terima kasih!`;
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
