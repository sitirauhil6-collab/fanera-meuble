import React, { useState } from 'react';
import { Plus, Edit2, Trash2, PackageCheck, TrendingUp, Phone, Building, Check, RefreshCw, X, AlertCircle } from 'lucide-react';
import { Product, StoreSettings, OrderRecord, FurnitureCategory, WoodType, FinishOption } from '../types/furniture';
import { formatRupiah } from '../utils/formatters';

interface SellerDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: OrderRecord[];
  onUpdateOrderStatus: (orderId: string, status: OrderRecord['orderStatus']) => void;
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
  onBackToStore: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  settings,
  onUpdateSettings,
  onBackToStore
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for new/edited product
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FurnitureCategory>('ruang-tamu');
  const [price, setPrice] = useState(2500000);
  const [woodType, setWoodType] = useState<WoodType>('Kayu Jati Perhutani (TPK Grade A)');
  const [dimensions, setDimensions] = useState('P 120 x L 60 x T 75 cm');
  const [weightEstKg, setWeightEstKg] = useState(20);
  const [stock, setStock] = useState(3);
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [preOrderDays, setPreOrderDays] = useState(14);
  const [image, setImage] = useState('/src/assets/images/product_teak_lounge_chair_1792587645629.jpg');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [joineryDetails, setJoineryDetails] = useState('Sambungan purus pasak (Mortise and Tenon) presisi.');

  // Settings form states
  const [sellerPhone, setSellerPhone] = useState(settings.sellerWhatsApp);
  const [storeTitle, setStoreTitle] = useState(settings.storeName);
  const [workshopAddr, setWorkshopAddr] = useState(settings.workshopAddress);
  const [bcaAcc, setBcaAcc] = useState(settings.bankAccountBCA);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Quick stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus !== 'Selesai').length;

  const handleOpenAdd = () => {
    setName('');
    setCategory('ruang-tamu');
    setPrice(2500000);
    setWoodType('Kayu Jati Perhutani (TPK Grade A)');
    setDimensions('P 120 x L 60 x T 75 cm');
    setWeightEstKg(20);
    setStock(3);
    setIsPreOrder(false);
    setShortDescription('Mebel kayu solid halus dengan presisi pertukangan khas Jepara.');
    setFullDescription('Dikerjakan dengan cermat oleh perajin kayu berpengalaman.');
    setJoineryDetails('Sambungan mortise & tenon tradisional tanpa baut kasar.');
    setEditingProduct(null);
    setIsAddingProduct(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setWoodType(p.woodType);
    setDimensions(p.dimensions);
    setWeightEstKg(p.weightEstKg);
    setStock(p.stock);
    setIsPreOrder(p.isPreOrder);
    setPreOrderDays(p.preOrderDays || 14);
    setImage(p.image);
    setShortDescription(p.shortDescription);
    setFullDescription(p.fullDescription);
    setJoineryDetails(p.joineryDetails);
    setIsAddingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const defaultFinishes: FinishOption[] = [
      'Natural Matte (Doff Halus)',
      'Walnut Brown (Hangat Elegan)',
      'Bleached Teak (Scandinavian Light)',
      'Deep Charcoal Satin'
    ];

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name,
        category,
        price,
        woodType,
        dimensions,
        weightEstKg,
        stock,
        isPreOrder,
        preOrderDays,
        image,
        shortDescription,
        fullDescription,
        joineryDetails,
        finishingOptions: defaultFinishes
      };
      onUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name,
        category,
        price,
        woodType,
        dimensions,
        weightEstKg,
        stock,
        isPreOrder,
        preOrderDays,
        image,
        shortDescription,
        fullDescription,
        joineryDetails,
        finishingOptions: defaultFinishes,
        isFeatured: false
      };
      onAddProduct(newProd);
    }
    setIsAddingProduct(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      storeName: storeTitle,
      sellerWhatsApp: sellerPhone,
      workshopAddress: workshopAddr,
      bankAccountBCA: bcaAcc
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header of Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-medium">
              Dasbor Pemilik Mebel
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-display font-medium text-stone-900 mt-1">
              Kelola Penjualan Mebel Saya
            </h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Atur katalog produk, stok, perbarui harga, pantau pesanan masuk, dan hubungkan nomor WhatsApp Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToStore}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
          >
            ← Kembali ke Tampilan Pembeli
          </button>
        </div>

        {/* Business Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm">
            <div className="text-xs text-stone-500 font-medium">Total Perabot di Toko</div>
            <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">{products.length} Mebel</div>
            <div className="text-[11px] text-stone-500 mt-1">
              Siap tampil di katalog pembeli
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm">
            <div className="text-xs text-stone-500 font-medium">Pesanan Masuk Aktif</div>
            <div className="text-2xl font-bold text-amber-900 mt-1 tabular-nums">{pendingOrders} Pesanan</div>
            <div className="text-[11px] text-stone-500 mt-1">
              {orders.length} total pesanan tercatat
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm">
            <div className="text-xs text-stone-500 font-medium">Nomor WhatsApp Penjual</div>
            <div className="text-lg font-bold text-emerald-800 mt-1 font-mono truncate">
              +{settings.sellerWhatsApp}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              Semua order WA otomatis masuk ke nomor ini
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-stone-200 gap-6 text-xs sm:text-sm font-medium mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Daftar Mebel ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Pesanan Masuk ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Pengaturan Toko & WhatsApp
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-stone-800">
                Koleksi Mebel yang Sedang Dijual
              </h2>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Mebel Baru</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Mebel</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Jenis Kayu</th>
                      <th className="py-3 px-4">Harga</th>
                      <th className="py-3 px-4">Stok</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded object-cover bg-stone-100 shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-stone-900 text-xs">{p.name}</div>
                              <div className="text-[11px] text-stone-500">{p.dimensions}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-700 capitalize">
                          {p.category.replace('-', ' ')}
                        </td>
                        <td className="py-3.5 px-4 text-stone-700">
                          {p.woodType.split('(')[0]}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-stone-900 tabular-nums">
                          {formatRupiah(p.price)}
                        </td>
                        <td className="py-3.5 px-4">
                          {p.isPreOrder ? (
                            <span className="text-amber-800 font-medium text-[11px]">
                              Pre-Order ({p.preOrderDays}h)
                            </span>
                          ) : (
                            <span className="text-emerald-800 font-medium text-[11px]">
                              Ready {p.stock} unit
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded cursor-pointer"
                            title="Edit Mebel"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus ${p.name}?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                            title="Hapus Mebel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-stone-800">
              Daftar Pesanan & Permintaan Konsultasi
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-stone-200">
                <PackageCheck className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                <p className="text-stone-800 font-medium text-sm">Belum ada pesanan yang tercatat</p>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Ketika pembeli memesan lewat tombol WhatsApp atau formulir checkout, data pesanannya akan langsung tampil di sini.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-amber-900 text-sm">
                          #{ord.id}
                        </span>
                        <span className="text-xs text-stone-500">
                          {new Date(ord.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Status Pengerjaan:</span>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="text-xs bg-stone-50 border border-stone-300 rounded p-1.5 font-medium text-stone-800"
                        >
                          <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                          <option value="Proses Pertukangan">Proses Pertukangan</option>
                          <option value="Finishing & QC">Finishing & QC</option>
                          <option value="Dalam Pengiriman">Dalam Pengiriman</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 text-xs">
                      <div>
                        <div className="text-stone-500">Pemesan:</div>
                        <div className="font-semibold text-stone-900 mt-0.5">{ord.customerName}</div>
                        <div className="text-stone-600">{ord.customerPhone}</div>
                      </div>

                      <div>
                        <div className="text-stone-500">Tujuan Kirim:</div>
                        <div className="text-stone-800 mt-0.5">{ord.customerAddress}, {ord.customerCity}</div>
                      </div>

                      <div className="md:text-right">
                        <div className="text-stone-500">Total Transaksi:</div>
                        <div className="font-bold text-stone-900 text-sm mt-0.5 tabular-nums">
                          {formatRupiah(ord.totalAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Ordered items preview */}
                    <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap gap-2 text-xs text-stone-600">
                      {ord.items.map((i, idx) => (
                        <div key={idx} className="bg-stone-50 px-2.5 py-1 rounded border border-stone-200">
                          <span className="font-medium text-stone-800">{i.productName}</span> ({i.quantity}x) · {i.finish}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STORE & WHATSAPP SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm">
            <h2 className="text-base font-semibold text-stone-900 mb-1">
              Pengaturan Toko & Nomor WhatsApp Anda
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Ubah nomor WhatsApp penjual agar calon pembeli langsung terhubung ke kontak Anda ketika menekan tombol &quot;Beli&quot; atau &quot;Pesan Kustom&quot;.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Nomor WhatsApp Penjual (Gunakan format 62...) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="Contoh: 6281234567890"
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Format harus diawali 62 tanpa spasi atau tanda plus (contoh: 6281288889999).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Nama Brand Mebel / Toko
                </label>
                <input
                  type="text"
                  value={storeTitle}
                  onChange={(e) => setStoreTitle(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Alamat Workshop & Gudang
                </label>
                <textarea
                  rows={2}
                  value={workshopAddr}
                  onChange={(e) => setWorkshopAddr(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Nomor Rekening Pembayaran (BCA / Mandiri)
                </label>
                <input
                  type="text"
                  value={bcaAcc}
                  onChange={(e) => setBcaAcc(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Simpan Pengaturan Toko
                </button>
                {saveSuccess && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Tersimpan dengan sukses!</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {isAddingProduct && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div 
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <h3 className="text-lg font-serif-display font-semibold text-stone-900">
                  {editingProduct ? 'Edit Data Mebel' : 'Tambah Mebel Baru ke Toko'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="p-1 text-stone-500 hover:text-stone-900 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Nama Mebel *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kursi Santai Jati & Rotan Aruna"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Kategori Ruangan
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as FurnitureCategory)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800"
                    >
                      <option value="ruang-tamu">Ruang Tamu</option>
                      <option value="ruang-makan">Ruang Makan</option>
                      <option value="kamar-tidur">Kamar Tidur</option>
                      <option value="ruang-kerja">Ruang Kerja</option>
                      <option value="dekorasi">Dekorasi & Aksesoris</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Harga Jual (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      step="50000"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Jenis Kayu Solid
                    </label>
                    <select
                      value={woodType}
                      onChange={(e) => setWoodType(e.target.value as WoodType)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800"
                    >
                      <option value="Kayu Jati Perhutani (TPK Grade A)">Kayu Jati Perhutani (TPK Grade A)</option>
                      <option value="Kayu Sungkai Solid">Kayu Sungkai Solid</option>
                      <option value="Kayu Suar / Trembesi Alami">Kayu Suar / Trembesi Alami</option>
                      <option value="Kayu Mahoni Oven Grade A">Kayu Mahoni Oven Grade A</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Ukuran Dimensi (P x L x T)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 180 x 90 x 76 cm"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800"
                    />
                  </div>
                </div>

                {/* Photo selection preset */}
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Pilihan Foto Produk Studio:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: 'Kursi Jati Rotan', url: '/src/assets/images/product_teak_lounge_chair_1792587645629.jpg' },
                      { name: 'Meja Makan Suar', url: '/src/assets/images/product_suar_dining_table_1792587646515.jpg' },
                      { name: 'Kredensa Sungkai', url: '/src/assets/images/product_sungkai_credenza_1792587646762.jpg' },
                      { name: 'Dipan Jati', url: '/src/assets/images/product_teak_platform_bed_1792587647046.jpg' }
                    ].map((opt) => (
                      <button
                        key={opt.url}
                        type="button"
                        onClick={() => setImage(opt.url)}
                        className={`relative rounded-lg overflow-hidden border p-1 cursor-pointer ${
                          image === opt.url ? 'border-amber-900 ring-2 ring-amber-900' : 'border-stone-200'
                        }`}
                      >
                        <img src={opt.url} alt={opt.name} referrerPolicy="no-referrer" className="w-full h-12 object-cover rounded" />
                        <span className="block text-[10px] text-stone-600 truncate mt-0.5">{opt.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Ketersediaan Stok
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 tabular-nums"
                      />
                      <span className="text-stone-500 text-xs">unit</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Status Pre-Order
                    </label>
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPreOrder}
                        onChange={(e) => setIsPreOrder(e.target.checked)}
                        className="rounded text-stone-900 focus:ring-0"
                      />
                      <span className="text-xs text-stone-700">Pre-Order (14 hari)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800"
                  />
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    {editingProduct ? 'Simpan Perubahan' : 'Terbitkan Mebel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
