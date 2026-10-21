import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Filter, Sparkles, Plus, PackageOpen } from 'lucide-react';
import { Product, CartItem, OrderRecord, StoreSettings, FurnitureCategory, FinishOption } from './types/furniture';
import { initialProducts, initialStoreSettings } from './data/furnitureData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CustomCalculator } from './components/CustomCalculator';
import { RoomVisualizer } from './components/RoomVisualizer';
import { CartDrawer } from './components/CartDrawer';
import { SellerDashboard } from './components/SellerDashboard';
import { WorkshopStory } from './components/WorkshopStory';
import { Footer } from './components/Footer';

export default function App() {
  // 1. Persistent State for Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('kriya_furniture_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialProducts;
  });

  // 2. Persistent State for Orders
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kriya_furniture_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // 3. Persistent State for Store Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('kriya_furniture_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.storeName || parsed.storeName === 'Kriya Kayu Studio') {
          parsed.storeName = 'Fanera Meuble';
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialStoreSettings;
  });

  // 4. Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kriya_furniture_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kriya_furniture_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('kriya_furniture_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('kriya_furniture_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('kriya_furniture_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // UI state
  const [activeTab, setActiveTab] = useState<'store' | 'seller'>('store');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter and search state
  const [selectedCategory, setSelectedCategory] = useState<FurnitureCategory>('semua');
  const [selectedWood, setSelectedWood] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Cart operations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleAddToCart = (product: Product, finish?: FinishOption, quantity = 1) => {
    const selectedFinish = finish || product.finishingOptions[0] || 'Natural Matte (Doff Halus)';
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedFinish === selectedFinish
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, selectedFinish, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (idx: number, qty: number) => {
    setCartItems((prev) => {
      const copy = [...prev];
      if (qty <= 0) {
        copy.splice(idx, 1);
      } else {
        copy[idx].quantity = qty;
      }
      return copy;
    });
  };

  const handleRemoveCartItem = (idx: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderCreated = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
  };

  // Seller management operations
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderRecord['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'semua' || p.category === selectedCategory;
      const matchesWood =
        selectedWood === 'semua' || p.woodType.toLowerCase().includes(selectedWood.toLowerCase());
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.woodType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesWood && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
      }
      return 0;
    });
  }, [products, selectedCategory, selectedWood, searchQuery, sortOption]);

  const categoryTabs: { id: FurnitureCategory; label: string }[] = [
    { id: 'semua', label: 'Semua Mebel' },
    { id: 'ruang-tamu', label: 'Ruang Tamu' },
    { id: 'ruang-makan', label: 'Ruang Makan' },
    { id: 'kamar-tidur', label: 'Kamar Tidur' },
    { id: 'ruang-kerja', label: 'Ruang Kerja' },
    { id: 'dekorasi', label: 'Dekorasi' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans-body">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        activeTab={activeTab}
        onSelectTab={(t) => setActiveTab(t)}
      />

      {/* Main Content Area */}
      {activeTab === 'seller' ? (
        <SellerDashboard
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          settings={settings}
          onUpdateSettings={setSettings}
          onBackToStore={() => setActiveTab('store')}
        />
      ) : (
        <main className="flex-1">
          {/* Hero Campaign Section */}
          <Hero
            onExploreClick={() => {
              const el = document.getElementById('katalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onCustomOrderClick={() => {
              const el = document.getElementById('kustom');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Catalog & Products Section */}
          <section id="katalog" className="py-16 md:py-24 border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-amber-900 font-medium mb-1">
                    Galeri & Katalog Siap Pesan
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-stone-900">
                    Koleksi Mebel Kayu Solid
                  </h2>
                  <p className="mt-2 text-stone-600 text-sm max-w-xl">
                    Setiap furnitur dibuat dengan kayu oven kering pilihan, sambungan presisi bebas derit, dan opsi lapisan warna alami.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kursi, meja, dipan..."
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg pl-9 pr-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Functional Interactive Category & Filter Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-stone-200">
                {/* Segmented Category Buttons (Allowed by Frontend-Design Section 1.A) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                  {categoryTabs.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Wood Type & Sort Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 whitespace-nowrap">Kayu:</span>
                    <select
                      value={selectedWood}
                      onChange={(e) => setSelectedWood(e.target.value)}
                      className="text-xs bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                    >
                      <option value="semua">Semua Jenis Kayu</option>
                      <option value="jati">Kayu Jati (Teak)</option>
                      <option value="suar">Kayu Suar (Trembesi)</option>
                      <option value="sungkai">Kayu Sungkai</option>
                      <option value="mahoni">Kayu Mahoni</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 whitespace-nowrap">Urutkan:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as any)}
                      className="text-xs bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                    >
                      <option value="featured">Pilihan Unggulan</option>
                      <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                      <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid (3 columns desktop, 2 tablet, 1 mobile) */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto">
                  <PackageOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-stone-900">Mebel Tidak Ditemukan</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Tidak ada produk yang cocok dengan kata kunci &quot;{searchQuery}&quot; atau filter yang dipilih.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('semua');
                      setSelectedWood('semua');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Reset Semua Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onAddToCart={(p) => handleAddToCart(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Bespoke Dimension & Price Calculator */}
          <CustomCalculator settings={settings} />

          {/* Interactive Room & Ambiance Visualizer */}
          <RoomVisualizer
            products={products}
            onSelectProduct={(p) => setQuickViewProduct(p)}
          />

          {/* Workshop Story & Wood Guide */}
          <WorkshopStory />
        </main>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, finish, qty) => handleAddToCart(p, finish, qty)}
        settings={settings}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        settings={settings}
        onOrderCreated={handleOrderCreated}
      />

      {/* Quiet Footer */}
      <Footer
        settings={settings}
        onOpenSellerMode={() => {
          setActiveTab('seller');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
