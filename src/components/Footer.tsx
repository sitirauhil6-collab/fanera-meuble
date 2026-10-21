import React from 'react';
import { Phone, MapPin, ShieldCheck, Mail, Clock } from 'lucide-react';
import { StoreSettings } from '../types/furniture';

interface FooterProps {
  settings: StoreSettings;
  onOpenSellerMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenSellerMode }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <h3 className="text-xl font-serif-display font-semibold text-white tracking-wide">
              {settings.storeName}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              {settings.tagline}. Kami memproduksi langsung perabot kayu solid pilihan dengan pengerjaan presisi dan estetika tak lekang waktu.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Kayu Solid Asli Bersertifikat Legal</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Eksplorasi Toko
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">Katalog Mebel</a>
              </li>
              <li>
                <a href="#kustom" className="hover:text-white transition-colors">Hitung Mebel Kustom</a>
              </li>
              <li>
                <a href="#inspirasi" className="hover:text-white transition-colors">Simulasi Ruangan</a>
              </li>
              <li>
                <a href="#tentang-kayu" className="hover:text-white transition-colors">Tentang Kayu & Perawatan</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSellerMode}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  ⚙️ Masuk Mode Penjual (Kelola Mebel)
                </button>
              </li>
            </ul>
          </div>

          {/* Workshop & Showroom */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Lokasi Workshop & Pengiriman
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.workshopAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Senin – Sabtu: 08.00 – 17.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Customer Service & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Layanan Pembeli & Pemesanan
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Konsultasi ukuran ruang, foto real-time kayu siap olah, dan cek ongkir ekspedisi mebel langsung via WhatsApp.
            </p>
            <a
              href={`https://wa.me/${settings.sellerWhatsApp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: +{settings.sellerWhatsApp}</span>
            </a>
          </div>
        </div>

        {/* Quiet copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} {settings.storeName}. Hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Kayu Jati TPK</span>
            <span aria-hidden="true">·</span>
            <span>Kayu Suar Solid</span>
            <span aria-hidden="true">·</span>
            <span>Kayu Sungkai</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
