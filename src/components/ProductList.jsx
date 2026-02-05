import React from "react";
import ProductCard from "./ProdukCard";

function ProductList({ products, onAddToCart }) {
  // Tampilan jika produk kosong
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-lg font-bold tracking-tight">Belum ada produk yang dijual.</p>
      </div>
    );
  }

  return (
    <section className="w-full px-6 py-12 bg-[#FAFAFA]">
      {/* Header Katalog */}
      <div className="max-w-[1440px] mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">
            Katalog <span className="text-red-500 not-italic">Produk</span>
          </h2>
          <div className="h-1.5 w-20 bg-red-600 mt-2 rounded-full"></div>
        </div>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.3em]">
          {products.length} Items Tersedia
        </p>
      </div>

      {/* Grid System: Otomatis menyesuaikan jumlah kolom berdasarkan lebar layar */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((item) => (
          <ProductCard 
            key={item.id} 
            item={item} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;