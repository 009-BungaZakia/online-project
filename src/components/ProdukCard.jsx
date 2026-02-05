import React from "react";

function ProdukCard({ item, onAddToCart }) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-[2.5rem] p-5 border border-gray-100 shadow-sm hover:shadow-2xl
     hover:shadow-gray-200 transition-all duration-500 flex flex-col h-full">
      {/* Container Gambar dengan Aspect Ratio & Hover Effect */}
      <div className="relative w-full aspect-square overflow-hidden rounded-[2rem] mb-6
       bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110
           transition-transform duration-700 ease-in-out"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
        {/* Badge Kategori - Floating Glassmorphism */}
        <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-800">
            {item.category || "General"}
          </span>
        </div>
      </div>

      {/* Body Card */}
      <div className="flex flex-col flex-1 px-1">
        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed mb-6">
          {item.desc || "No description available for this awesome product."}
        </p>

        {/* Footer: Harga & Button */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price</span>
            <span className="text-xl font-black text-red-400 tracking-tighter">
              {formatRupiah(item.price)}
            </span>
          </div>

          <button
            className="flex items-center justify-center bg-gray-900 hover:bg-black text-white p-4 rounded-2xl transition-all duration-300 transform active:scale-90 hover:rotate-3 shadow-lg shadow-gray-200"
            onClick={() => onAddToCart(item)}
            title="Add to Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdukCard;