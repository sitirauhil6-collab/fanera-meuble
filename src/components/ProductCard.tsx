import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types/furniture';
import { formatRupiah } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart
}) => {
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300 cursor-pointer"
    >
      {/* Product Image Slot (65%-70% visual prominence) */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
            <span className="text-stone-400 text-xs font-medium">Fanera Meuble</span>
            <span className="text-stone-600 text-sm font-semibold mt-1">{product.name}</span>
          </div>
        )}

        {/* Hover overlay quick action */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-2 bg-white/95 text-stone-900 text-xs font-medium rounded-lg shadow-md hover:bg-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detail & Ukuran</span>
          </button>
        </div>

        {/* Single subtle text tag for availability if relevant (Zero-Pill discipline) */}
        <div className="absolute top-3 left-3">
          {product.isPreOrder ? (
            <span className="bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] font-medium px-2 py-0.5 rounded">
              PO {product.preOrderDays || 14} Hari
            </span>
          ) : product.stock <= 2 ? (
            <span className="bg-amber-900/80 backdrop-blur-sm text-amber-50 text-[11px] font-medium px-2 py-0.5 rounded">
              Sisa {product.stock} Unit
            </span>
          ) : null}
        </div>
      </div>

      {/* Content details */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean unboxed metadata with dot separator (Strict Anti-Slop rule) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <span className="truncate max-w-[170px]">{product.woodType.split('(')[0].trim()}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.dimensions}</span>
          </div>

          <h3 className="text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-stone-600 line-clamp-2 font-normal leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price and Cart Quick Add button */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-[11px] text-stone-500">Harga Perajin</div>
            <div className="text-base font-semibold text-stone-900 tabular-nums">
              {formatRupiah(product.price)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Tambah ${product.name} ke keranjang`}
            className={`cursor-pointer px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
              addedAnimation 
                ? 'bg-emerald-700 text-white' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Masuk Keranjang</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Pesan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
