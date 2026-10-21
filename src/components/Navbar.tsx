import React, { useState } from 'react';
import { ShoppingBag, SlidersHorizontal, Menu, X } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeTab: 'store' | 'seller';
  onSelectTab: (tab: 'store' | 'seller') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  activeTab,
  onSelectTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a 
          href="#beranda" 
          onClick={() => onSelectTab('store')}
          className="text-2xl font-serif-display font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-900 transition-colors"
        >
          Fanera Meuble
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <a 
            href="#katalog" 
            onClick={() => onSelectTab('store')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Koleksi Mebel
          </a>
          <a 
            href="#kustom" 
            onClick={() => onSelectTab('store')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Pesanan Kustom
          </a>
          <a 
            href="#inspirasi" 
            onClick={() => onSelectTab('store')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Ruang Inspirasi
          </a>
          <a 
            href="#tentang-kayu" 
            onClick={() => onSelectTab('store')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Tentang Kayu
          </a>
          <button 
            type="button"
            onClick={() => onSelectTab(activeTab === 'seller' ? 'store' : 'seller')}
            className={`cursor-pointer whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'seller' 
                ? 'text-amber-900 font-semibold underline underline-offset-4' 
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            {activeTab === 'seller' ? 'Lihat Toko Pembeli' : 'Kelola Mebel Saya'}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Shopping Cart drawer trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Buka Keranjang Belanja"
            className="relative flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            <span className="bg-amber-700 text-amber-50 font-semibold px-1.5 py-0.5 rounded text-[11px] tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F5] border-b border-stone-200 px-6 py-4 space-y-3">
          <a
            href="#katalog"
            onClick={() => { onSelectTab('store'); setMobileMenuOpen(false); }}
            className="block text-sm font-medium text-stone-800 py-1"
          >
            Koleksi Mebel
          </a>
          <a
            href="#kustom"
            onClick={() => { onSelectTab('store'); setMobileMenuOpen(false); }}
            className="block text-sm font-medium text-stone-800 py-1"
          >
            Pesanan Kustom
          </a>
          <a
            href="#inspirasi"
            onClick={() => { onSelectTab('store'); setMobileMenuOpen(false); }}
            className="block text-sm font-medium text-stone-800 py-1"
          >
            Ruang Inspirasi
          </a>
          <a
            href="#tentang-kayu"
            onClick={() => { onSelectTab('store'); setMobileMenuOpen(false); }}
            className="block text-sm font-medium text-stone-800 py-1"
          >
            Tentang Kayu
          </a>
          <button
            type="button"
            onClick={() => {
              onSelectTab(activeTab === 'seller' ? 'store' : 'seller');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left text-sm font-semibold text-amber-900 py-1 cursor-pointer"
          >
            {activeTab === 'seller' ? '← Kembali ke Toko Pembeli' : '⚙️ Kelola Mebel Saya (Mode Penjual)'}
          </button>
        </div>
      )}
    </header>
  );
};
