import React, { useState } from 'react';
import { X, Check, ShoppingBag, MessageCircle, Ruler, Shield, Sparkles, Truck } from 'lucide-react';
import { Product, FinishOption, StoreSettings } from '../types/furniture';
import { formatRupiah } from '../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish: FinishOption, quantity: number) => void;
  settings: StoreSettings;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  settings
}) => {
  if (!product) return null;

  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(
    product.finishingOptions[0] || 'Natural Matte (Doff Halus)'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'detail' | 'konstruksi' | 'perawatan'>('detail');
  const [isSuccessAdded, setIsSuccessAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedFinish, quantity);
    setIsSuccessAdded(true);
    setTimeout(() => {
      setIsSuccessAdded(false);
      onClose();
    }, 900);
  };

  const handleDirectWhatsApp = () => {
    const cleanPhone = settings.sellerWhatsApp.replace(/[^0-9]/g, '');
    const message = `Halo ${settings.storeName}, saya tertarik memesan mebel:\n\n*${product.name}*\n• Pilihan Finishing: ${selectedFinish}\n• Jumlah: ${quantity} unit\n• Harga Satuan: ${formatRupiah(product.price)}\n• Estimasi Total: ${formatRupiah(product.price * quantity)}\n\nApakah barang ini ready atau pre-order? Mohon info biaya pengirimannya. Terima kasih!`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup Detail"
          className="absolute top-4 right-4 z-10 p-2 text-stone-600 hover:text-stone-900 bg-white/90 hover:bg-stone-100 rounded-full shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Media Column */}
          <div className="md:col-span-6 bg-stone-100 relative min-h-[320px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center max-h-[460px] md:max-h-full"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-stone-900/70 backdrop-blur-sm rounded-lg text-white text-xs">
              <span className="font-semibold">{product.woodType}</span>
              <p className="text-stone-300 text-[11px] mt-0.5">{product.joineryDetails}</p>
            </div>
          </div>

          {/* Right Product Details Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-amber-900 font-medium">
                {product.category.replace('-', ' ')}
              </div>

              <h2 className="text-2xl font-serif-display font-semibold text-stone-900 leading-snug">
                {product.name}
              </h2>

              <div className="text-2xl font-bold text-stone-900 tabular-nums">
                {formatRupiah(product.price)}
              </div>

              <p className="text-sm text-stone-600 leading-relaxed font-normal">
                {product.fullDescription}
              </p>

              {/* Finishing Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Pilihan Lapisan Finishing:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.finishingOptions.map((fin) => (
                    <button
                      key={fin}
                      type="button"
                      onClick={() => setSelectedFinish(fin)}
                      className={`text-left text-xs p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedFinish === fin
                          ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-sm'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate">{fin}</span>
                      {selectedFinish === fin && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimension & Specs Tabs */}
              <div className="pt-3 border-t border-stone-200">
                <div className="flex border-b border-stone-200 gap-4 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setActiveTab('detail')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'detail'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Dimensi & Fisik
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('konstruksi')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'konstruksi'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Konstruksi Pasak
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('perawatan')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'perawatan'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Perawatan Kayu
                  </button>
                </div>

                <div className="py-3 text-xs text-stone-600 space-y-1.5 leading-relaxed">
                  {activeTab === 'detail' && (
                    <>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Ukuran / Dimensi:</span>
                        <span className="font-semibold text-stone-800">{product.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Bahan Baku:</span>
                        <span className="font-semibold text-stone-800">{product.woodType}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Estimasi Bobot:</span>
                        <span className="font-semibold text-stone-800">{product.weightEstKg} kg</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">Ketersediaan:</span>
                        <span className="font-semibold text-stone-800">
                          {product.isPreOrder ? `Pre-Order (${product.preOrderDays || 14} hari kerja)` : `Ready Stock (${product.stock} unit)`}
                        </span>
                      </div>
                    </>
                  )}

                  {activeTab === 'konstruksi' && (
                    <p>
                      {product.joineryDetails} Menggunakan lem kayu berkualitas D3 anti-air dan pengerjaan mesin kalibrasi rata untuk menjamin permukaan 100% presisi dan tidak bergoyang saat diletakkan di lantai datar.
                    </p>
                  )}

                  {activeTab === 'perawatan' && (
                    <p>
                      Lap dengan kain mikrofiber kering secara berkala. Hindari cairan pembersih kimia keras atau alkohol. Disarankan oleskan lilin lebah (beeswax oil) alami 6 bulan sekali untuk menjaga kilau dan kelembapan serat kayu.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Purchase CTA Strip */}
            <div className="pt-4 border-t border-stone-200 mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 px-2 py-1">
                  <span className="text-xs text-stone-500 mr-2">Qty:</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-200 rounded cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-200 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isSuccessAdded}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSuccessAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                  }`}
                >
                  {isSuccessAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Berhasil Ditambahkan!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tambah ke Keranjang • {formatRupiah(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Tanya & Pesan Langsung via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
