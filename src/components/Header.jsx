import React from "react";

function Header({ cartCount, onOpenCart }) {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-white/70 backdrop-blur-lg border-b border-gray-100 flex justify-between items-center">
      {/* Brand */}
      <div className="group cursor-pointer">
        <h1 className="text-2xl font-black tracking-tighter text-gray-900 italic">
          SMK <span className="text-red-500">STORE</span>
        </h1>
        <div className="h-1 w-0 group-hover:w-full bg-red-600 transition-all duration-300"></div>
      </div>

      {/* Cart Button */}
      <button 
        onClick={onOpenCart}
        className="relative flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-full transition-all active:scale-95 shadow-lg shadow-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Keranjang</span>
        
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}

export default Header;