import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Building2, CheckCircle2, Copy, Check } from 'lucide-react';
import { CartItem, StoreSettings, OrderRecord } from '../types/furniture';
import { formatRupiah, generateOrderId, buildWhatsAppOrderUrl } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  settings: StoreSettings;
  onOrderCreated: (order: OrderRecord) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings,
  onOrderCreated
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'whatsapp' | 'transfer_bca' | 'transfer_mandiri' | 'dp_50'>('whatsapp');
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleProceedToForm = () => {
    setCheckoutStep('form');
  };

  const handleFinalizeOrder = (method: 'whatsapp' | 'transfer_bca' | 'transfer_mandiri' | 'dp_50') => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman.');
      return;
    }

    const orderId = generateOrderId();
    const newOrder: OrderRecord = {
      id: orderId,
      date: new Date().toISOString(),
      customerName,
      customerPhone,
      customerAddress,
      customerCity: customerCity || 'Jawa & Sekitarnya',
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        finish: i.selectedFinish,
        quantity: i.quantity,
        price: i.product.price
      })),
      totalAmount: subtotal,
      paymentMethod: method,
      orderStatus: 'Menunggu Konfirmasi'
    };

    onOrderCreated(newOrder);
    setLastOrder(newOrder);

    if (method === 'whatsapp') {
      const waUrl = buildWhatsAppOrderUrl(
        items,
        {
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
          city: customerCity || 'Kota Pembeli',
          notes
        },
        subtotal,
        settings,
        orderId
      );
      window.open(waUrl, '_blank');
    }

    setCheckoutStep('success');
    onClearCart();
  };

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h3 className="font-semibold text-stone-900 text-base">
              {checkoutStep === 'cart' && `Keranjang Belanja (${items.length})`}
              {checkoutStep === 'form' && 'Konfirmasi Pengiriman'}
              {checkoutStep === 'success' && 'Pesanan Berhasil Dicatat'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Keranjang"
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-medium text-stone-800 text-sm">Keranjang Anda masih kosong</p>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Pilih perabot idaman dari katalog kami untuk dimasukkan ke dalam daftar pemesanan.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedFinish}-${idx}`}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex gap-3.5"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Finishing: <span className="font-medium text-stone-700">{item.selectedFinish.split('(')[0]}</span>
                        </div>
                        <div className="text-xs font-semibold text-stone-900 mt-1.5 tabular-nums">
                          {formatRupiah(item.product.price)}
                        </div>

                        {/* Quantity and Remove */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                          <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded px-1.5 py-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                              className="w-5 h-5 text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold w-5 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="w-5 h-5 text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(idx)}
                            className="text-stone-400 hover:text-red-700 p-1 cursor-pointer"
                            title="Hapus barang"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'form' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-xs text-amber-900">
                Lengkapi rincian alamat tujuan untuk perhitungan ekspedisi mebel dan penjadwalan armada truk kami.
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Nama Lengkap Pemesan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Prasetyo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Kota / Kabupaten Tujuan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Jakarta Selatan / Surabaya / Bandung"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Alamat Lengkap Pengiriman *
                </label>
                <textarea
                  required
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, patokan lokasi"
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Catatan Pengiriman (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Misal: Mohon info 1 hari sebelum truk tiba"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>
          )}

          {checkoutStep === 'success' && lastOrder && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-serif-display font-semibold text-stone-900">
                Pemesanan Berhasil Dicatat!
              </h4>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-semibold border-b border-stone-200 pb-2">
                  <span>No. Invoice:</span>
                  <span className="text-amber-900 font-mono">#{lastOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Nama Pemesan:</span>
                  <span className="font-medium text-stone-800">{lastOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Alamat:</span>
                  <span className="font-medium text-stone-800 text-right truncate max-w-[200px]">{lastOrder.customerAddress}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-stone-900">
                  <span>Total Transaksi:</span>
                  <span className="tabular-nums">{formatRupiah(lastOrder.totalAmount)}</span>
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 text-left text-xs space-y-2">
                <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>Rekening Resmi Pembayaran Toko:</span>
                </div>
                <div className="p-2 bg-white rounded border border-amber-200 flex items-center justify-between">
                  <span className="font-mono text-stone-800 font-semibold">{settings.bankAccountBCA}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(settings.bankAccountBCA)}
                    className="text-amber-900 hover:text-amber-950 p-1 cursor-pointer"
                    title="Salin No Rekening"
                  >
                    {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  DP 50% ({formatRupiah(lastOrder.totalAmount * 0.5)}) untuk mulai proses pengerjaan mebel, dan pelunasan saat barang siap dikirim ke armada truk.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Kembali ke Toko
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50/70 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-stone-600">Total Perabot:</span>
              <span className="text-xl font-bold text-stone-900 tabular-nums">
                {formatRupiah(subtotal)}
              </span>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                type="button"
                onClick={handleProceedToForm}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <span>Lanjut Isi Alamat Pengiriman</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleFinalizeOrder('whatsapp')}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Pesanan Otomatis ke WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFinalizeOrder('transfer_bca')}
                  className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-stone-600" />
                  <span>Bayar via Transfer Bank (DP 50% / Lunas)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-center text-xs text-stone-500 hover:text-stone-800 py-1 cursor-pointer"
                >
                  ← Kembali ubah item keranjang
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
