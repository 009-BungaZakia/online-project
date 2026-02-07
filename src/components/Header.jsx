import React from "react";

function Header({ cartCount, onOpenCart, user, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-white/70 backdrop-blur-lg border-b border-gray-100 flex justify-between items-center">
      {/* Brand */}
      <div className="group cursor-pointer">
        <h1 className="text-2xl font-black tracking-tighter text-gray-900 italic">
          SMK <span className="text-red-500">STORE</span>
        </h1>
        <div className="h-1 w-0 group-hover:w-full bg-red-600 transition-all duration-300"></div>
      </div>

      {/* Right Side: User Profile & Cart */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* User Info Section */}
        <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
          {/* Menghapus 'hidden xs:block' agar teks selalu muncul */}
          <div className="text-right">
            <p className="text-[10px] font-black text-red-500 uppercase tracking-tighter leading-none">
              {user?.role}
            </p>
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {user?.name}
            </p>
            {/* Memperbesar area klik tombol logout */}
            <button 
              onClick={onLogout}
              className="text-[10px] font-black text-gray-400 uppercase hover:text-red-600 transition-colors tracking-widest block mt-1"
            >
              [ LOGOUT ]
            </button>
          </div>
          <img 
            src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"} 
            alt="User" 
            className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm object-cover bg-gray-100"
          />
        </div>

        {/* Cart Button */}
        <button 
          onClick={onOpenCart}
          className="relative flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-full transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Keranjang</span>
          
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;