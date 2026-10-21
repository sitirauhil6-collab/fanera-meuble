import React from 'react';
import { TreePine, Hammer, Sparkles, ShieldCheck } from 'lucide-react';
import { woodGuides } from '../data/furnitureData';

export const WorkshopStory: React.FC = () => {
  return (
    <section id="tentang-kayu" className="py-16 md:py-24 border-b border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs uppercase tracking-widest text-amber-900 font-medium">
              Filosofi Pertukangan Kami
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-stone-900 leading-snug">
              Menghargai setiap serat kayu dari hutan lestari nusantara.
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Kayu solid bukan sekadar bahan benda mati; ia bernapas, memiliki karakter urat yang tak pernah kembar, dan semakin anggun seiring berjalannya usia pemakaian. Di workshop Jepara kami, setiap balok kayu melalui proses kiln-dry oven hingga kadar air stabil di bawah 12% sebelum disentuh pahat tangan.
            </p>

            <div className="pt-2 space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-amber-50 text-amber-900 mt-0.5 shrink-0">
                  <Hammer className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Sambungan Pasak Tradisional:</span>
                  <span className="text-stone-600 ml-1">Kekuatan struktural mengandalkan sambungan purus dan lubang pasak, bukan paku tembak biasa yang mudah goyang.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-amber-50 text-amber-900 mt-0.5 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Finishing Ramah Lingkungan:</span>
                  <span className="text-stone-600 ml-1">Menggunakan pelapis water-based polyurethane dan minyak lilin lebah organik yang aman bagi anak balita dan tidak berbau menyengat.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Wood Species Guide */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200/90 p-6 sm:p-8">
              <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-amber-900" />
                <span>Panduan Karakter Kayu Mebel Kami</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {woodGuides.map((guide) => (
                  <div key={guide.name} className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-display font-semibold text-stone-900 text-base">
                        {guide.name}
                      </h4>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {guide.character}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <div className="text-[11px] text-amber-900 font-medium">
                        {guide.durability}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        {guide.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
