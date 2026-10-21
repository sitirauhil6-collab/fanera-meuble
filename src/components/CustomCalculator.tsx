import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, Ruler, Info, Sparkles, Check } from 'lucide-react';
import { StoreSettings } from '../types/furniture';
import { formatRupiah, buildCustomOrderWhatsAppUrl } from '../utils/formatters';

interface CustomCalculatorProps {
  settings: StoreSettings;
}

export const CustomCalculator: React.FC<CustomCalculatorProps> = ({ settings }) => {
  const [itemType, setItemType] = useState('Meja Makan Solid');
  const [woodType, setWoodType] = useState('Kayu Jati Perhutani (TPK Grade A)');
  const [lengthCm, setLengthCm] = useState(180);
  const [widthCm, setWidthCm] = useState(85);
  const [heightCm, setHeightCm] = useState(76);
  const [finish, setFinish] = useState('Natural Matte (Doff Halus)');
  const [notes, setNotes] = useState('');

  // Realistic wood base price multiplier per cubic meter / surface area in Jepara industry
  const estimatedPrice = useMemo(() => {
    let basePrice = 2000000;
    
    // Wood factor
    let woodMultiplier = 1.0;
    if (woodType.includes('Jati')) woodMultiplier = 1.6;
    else if (woodType.includes('Suar')) woodMultiplier = 1.4;
    else if (woodType.includes('Sungkai')) woodMultiplier = 1.25;
    else if (woodType.includes('Mahoni')) woodMultiplier = 1.0;

    // Item type complexity factor
    let typeFactor = 1.0;
    if (itemType.includes('Meja Makan')) typeFactor = 1.4;
    else if (itemType.includes('Tempat Tidur')) typeFactor = 1.7;
    else if (itemType.includes('Kredensa')) typeFactor = 1.5;
    else if (itemType.includes('Meja Kerja')) typeFactor = 1.2;
    else if (itemType.includes('Kursi')) typeFactor = 0.9;
    else if (itemType.includes('Rak')) typeFactor = 1.1;

    // Dimension scaling based on surface area
    const areaM2 = (lengthCm * widthCm) / 10000;
    const baseArea = 1.5; // standard reference ~ 180x85cm
    const scale = Math.max(0.6, areaM2 / baseArea);

    const calculated = basePrice * woodMultiplier * typeFactor * scale;
    // Round to nearest 50,000 IDR
    return Math.round(calculated / 50000) * 50000;
  }, [itemType, woodType, lengthCm, widthCm, heightCm]);

  const handleSendWhatsApp = () => {
    const url = buildCustomOrderWhatsAppUrl(
      {
        itemType,
        woodType,
        dimensions: `P ${lengthCm} x L ${widthCm} x T ${heightCm} cm`,
        finish,
        estimatedPrice,
        notes
      },
      settings
    );
    window.open(url, '_blank');
  };

  return (
    <section id="kustom" className="py-16 md:py-24 bg-[#F5F2EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-medium mb-2">
            Layanan Mebel Kustom & Made to Order
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-stone-900">
            Kalkulator Estimasi Mebel Sesuai Ruangan Anda
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Punya denah ruangan khusus atau ingin ukuran custom? Hitung estimasi biaya produksi kayu solid secara transparan dan konsultasikan sketsa bersama perajin kami.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Configurations */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  1. Jenis Perabot:
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="Meja Makan Solid">Meja Makan Solid (Dining Table)</option>
                  <option value="Meja Kerja / Meja Belajar">Meja Kerja / Belajar (Study & Work Desk)</option>
                  <option value="Tempat Tidur / Dipan Solid">Tempat Tidur / Dipan (Platform Bed)</option>
                  <option value="Lemari Kredensa / Sideboard">Lemari Kredensa / Sideboard (Credenza)</option>
                  <option value="Kursi Santai Lounge">Kursi Santai Lounge (Armchair)</option>
                  <option value="Coffee Table Ruang Tamu">Coffee Table Ruang Tamu</option>
                  <option value="Rak Buku / Display Kayu">Rak Buku / Display Bertingkat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  2. Jenis Kayu Solid:
                </label>
                <select
                  value={woodType}
                  onChange={(e) => setWoodType(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="Kayu Jati Perhutani (TPK Grade A)">Kayu Jati Perhutani (TPK Grade A - Terbaik)</option>
                  <option value="Kayu Suar / Trembesi Alami">Kayu Suar / Trembesi Slab Utuh</option>
                  <option value="Kayu Sungkai Solid">Kayu Sungkai Solid (Krem Cerah Bersih)</option>
                  <option value="Kayu Mahoni Oven Grade A">Kayu Mahoni Oven Grade A</option>
                </select>
              </div>

              {/* Dimensions Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  3. Ukuran Kustom (Panjang x Lebar x Tinggi dlm Centimeter):
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-stone-500 block mb-1">Panjang (P):</span>
                    <div className="relative">
                      <input
                        type="number"
                        min="40"
                        max="400"
                        value={lengthCm}
                        onChange={(e) => setLengthCm(Number(e.target.value))}
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 tabular-nums"
                      />
                      <span className="absolute right-2 top-2 text-[11px] text-stone-400">cm</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 block mb-1">Lebar (L):</span>
                    <div className="relative">
                      <input
                        type="number"
                        min="30"
                        max="200"
                        value={widthCm}
                        onChange={(e) => setWidthCm(Number(e.target.value))}
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 tabular-nums"
                      />
                      <span className="absolute right-2 top-2 text-[11px] text-stone-400">cm</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 block mb-1">Tinggi (T):</span>
                    <div className="relative">
                      <input
                        type="number"
                        min="20"
                        max="240"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 tabular-nums"
                      />
                      <span className="absolute right-2 top-2 text-[11px] text-stone-400">cm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  4. Lapisan Finishing:
                </label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="Natural Matte (Doff Halus)">Natural Matte (Doff Halus)</option>
                  <option value="Walnut Brown (Hangat Elegan)">Walnut Brown (Hangat Elegan)</option>
                  <option value="Bleached Teak (Scandinavian Light)">Bleached Teak (Scandinavian Light)</option>
                  <option value="Deep Charcoal Satin">Deep Charcoal Satin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Catatan Tambahan / Permintaan Khusus (Opsional):
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: Saya ingin tepi meja agak membulat (bevel), dan kaki meja model silang X..."
                  rows={2}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Price Output & Consultation Summary */}
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Calculator className="w-4 h-4" />
                  <span>Rincian Estimasi Biaya</span>
                </div>

                <div className="mt-4 pb-4 border-b border-stone-200">
                  <div className="text-xs text-stone-500">Estimasi Biaya Produksi:</div>
                  <div className="text-3xl font-serif-display font-bold text-stone-900 mt-1 tabular-nums">
                    {formatRupiah(estimatedPrice)}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>Sudah termasuk bahan baku kayu solid, ongkos tukang ukir/presisi, dan finishing.</span>
                  </div>
                </div>

                <div className="py-4 space-y-2 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Perabot:</span>
                    <span className="font-medium text-stone-900">{itemType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Bahan Baku:</span>
                    <span className="font-medium text-stone-900">{woodType.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Ukuran Akhir:</span>
                    <span className="font-medium text-stone-900 tabular-nums">P {lengthCm} x L {widthCm} x T {heightCm} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Finishing:</span>
                    <span className="font-medium text-stone-900">{finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Estimasi Waktu Pengerjaan:</span>
                    <span className="font-medium text-amber-900">14 – 21 Hari Kerja</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-2">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Spesifikasi Custom via WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-stone-500">
                  Konsultasi desain 100% gratis. Tukang kayu kami siap menggambar 3D kasar sebelum produksi dimulai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
