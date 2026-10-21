import React from 'react';
import { ArrowRight, ShieldCheck, TreePine, Truck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomOrderClick }) => {
  return (
    <section id="beranda" className="relative pt-6 pb-16 md:pt-10 md:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split grid layout: Left Headline & CTA, Right High-Fidelity Artisan Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-900 font-medium">
              Bengkel & Galeri Perajin Mebel Solid
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Kehangatan kayu alami untuk kenyamanan rumah Anda.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              Setiap karya dipahat dengan presisi sambungan pasak tradisional oleh perajin kayu Jepara. Menggunakan kayu jati, suar, dan sungkai bersertifikat legal dengan finishing doff ramah lingkungan.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <span>Jelajahi Koleksi Mebel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={onCustomOrderClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-sm font-medium rounded-lg transition-colors cursor-pointer border border-stone-300"
              >
                <span>Hitung Pesanan Kustom</span>
              </button>
            </div>

            {/* Quiet craftsmanship metadata */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-500">
              <span>Kayu Legal Perhutani</span>
              <span aria-hidden="true">·</span>
              <span>Garansi Rangka 3 Tahun</span>
              <span aria-hidden="true">·</span>
              <span>Siap Kirim & Pre-Order Kustom</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 aspect-[16/10] sm:aspect-[16/11]">
              <img
                src="/src/assets/images/hero_furniture_living_1792587645572.jpg"
                alt="Ruang tamu estetik dengan kursi santai kayu jati rotan dan meja kopi bundar Fanera Meuble"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-900/80 backdrop-blur-md rounded-xl text-stone-100 text-xs sm:text-sm flex items-center justify-between">
                <div>
                  <div className="font-serif-display font-medium text-white text-base">Seri Living Room Japandi Tropis</div>
                  <div className="text-stone-300 text-xs">Kayu Jati Grade A & Rotan Alami Jepara</div>
                </div>
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="px-3 py-1.5 bg-white text-stone-900 font-medium text-xs rounded hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Lihat Seri
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Trust Strip */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-stone-200">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-amber-100/60 text-amber-900 shrink-0">
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Bahan Baku Kayu Solid Terpilih</h2>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Hanya menggunakan kayu jati TPK Perhutani oven kering dan suar slab utuh tanpa campuran partikel serbuk atau triplek.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-amber-100/60 text-amber-900 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Konstruksi Pasak Tradisional</h2>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Sambungan kayu mortise and tenon yang teruji ratusan tahun, anti goyang, dan garansi konstruksi fisik hingga 3 tahun.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-amber-100/60 text-amber-900 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Pengiriman Truk Khusus Mebel</h2>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Dilapisi kardus tebal dan busa pembungkus, diantar oleh sopir ekspedisi spesialis mebel langsung sampai di dalam ruangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
