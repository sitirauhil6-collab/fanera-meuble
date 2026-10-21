import React, { useState } from 'react';
import { Eye, Layers, Palette, Sparkles, Check } from 'lucide-react';
import { Product } from '../types/furniture';
import { formatRupiah } from '../utils/formatters';

interface RoomVisualizerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const wallThemes = [
  { id: 'linen', name: 'Putih Kapur (Linen)', bgClass: 'bg-[#F4F1EA]', borderClass: 'border-[#E5DEC9]' },
  { id: 'terracotta', name: 'Terracotta Tropis', bgClass: 'bg-[#D9826C]/20', borderClass: 'border-[#D9826C]/40' },
  { id: 'sage', name: 'Sage Minimalis', bgClass: 'bg-[#C2CDBC]/25', borderClass: 'border-[#A3B39C]/40' },
  { id: 'cement', name: 'Semen Expose Modern', bgClass: 'bg-[#E3E3E3]', borderClass: 'border-[#D1D1D1]' }
];

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({
  products,
  onSelectProduct
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [selectedWallTheme, setSelectedWallTheme] = useState('linen');

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const activeWall = wallThemes.find((w) => w.id === selectedWallTheme) || wallThemes[0];

  return (
    <section id="inspirasi" className="py-16 md:py-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-medium mb-1.5">
              Simulasi Tata Ruang
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-stone-900">
              Inspirasi Penataan & Harmoni Warna
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              Lihat keserasian serat kayu solid alami ketika dipadukan dengan berbagai palet dinding ruangan interior Anda.
            </p>
          </div>

          {/* Wall palette switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 mr-1 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5" />
              <span>Warna Dinding:</span>
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
              {wallThemes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedWallTheme(theme.id)}
                  title={theme.name}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    selectedWallTheme === theme.id
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {theme.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualizer Display Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visualizer Stage */}
          <div className="lg:col-span-8 flex flex-col">
            <div 
              className={`relative rounded-2xl overflow-hidden border ${activeWall.borderClass} ${activeWall.bgClass} transition-colors duration-500 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px] shadow-sm`}
            >
              {/* Product render frame */}
              {currentProduct && (
                <div className="relative max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-stone-200/80 bg-white group">
                  <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-xs px-2.5 py-1 rounded">
                      {currentProduct.woodType.split('(')[0]}
                    </div>
                  </div>

                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm">
                        {currentProduct.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Dimensi Ruang: {currentProduct.dimensions}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-stone-900 tabular-nums">
                        {formatRupiah(currentProduct.price)}
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectProduct(currentProduct)}
                        className="text-xs font-semibold text-amber-900 hover:text-amber-950 underline mt-0.5 cursor-pointer"
                      >
                        Lihat Spesifikasi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Ambiance caption */}
              <div className="mt-6 text-xs text-stone-600 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-stone-200">
                Suasana Ruangan: <span className="font-semibold text-stone-900">{activeWall.name}</span> · Pencahayaan Alami 5000K
              </div>
            </div>
          </div>

          {/* Right Product Selector Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Pilih Mebel untuk Disimulasikan:
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1">
              {products.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedProductId(item.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    selectedProductId === item.id
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover shrink-0 bg-stone-100"
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-semibold truncate ${selectedProductId === item.id ? 'text-white' : 'text-stone-900'}`}>
                      {item.name}
                    </div>
                    <div className={`text-[11px] truncate mt-0.5 ${selectedProductId === item.id ? 'text-stone-300' : 'text-stone-500'}`}>
                      {item.woodType.split('(')[0]}
                    </div>
                    <div className={`text-xs font-semibold mt-1 tabular-nums ${selectedProductId === item.id ? 'text-amber-300' : 'text-stone-900'}`}>
                      {formatRupiah(item.price)}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {currentProduct && (
              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="font-semibold text-stone-900">Tips Keselarasan Desain:</div>
                <p>
                  Kayu dengan finishing <span className="italic">{currentProduct.finishingOptions[0]}</span> memberikan pantulan cahaya hangat yang membuat ruangan sempit terasa lebih lapang dan nyaman secara psikologis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
