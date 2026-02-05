import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function CartSidebar({ isOpen, closeCart, cartItems = [], updateQty, removeItem }) {
  const [view, setView] = useState("cart");

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || 0),
    0
  );

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const handleCloseSidebar = () => {
    setView("cart");
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleCloseSidebar}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-sm
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[90%] bg-white z-50
        shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-800 tracking-tight">
              {view === "cart" && "Keranjang Belanja"}
              {view === "qr" && "Pembayaran QRIS"}
              {view === "struk" && "Konfirmasi Pembayaran"}
            </h2>
          </div>
          <button
            onClick={handleCloseSidebar}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          
          {/* VIEW 1: CART ITEMS */}
          {view === "cart" && (
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 opacity-30">
                  <p className="font-bold">Keranjang Kosong</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover bg-gray-50 shadow-inner"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-black text-gray-800 line-clamp-1 uppercase tracking-tight">{item.name}</h4>
                        <p className="text-black-600 font-black text-sm">{formatRupiah(item.price)}</p>
                      </div>
                      
                      {/* Kontrol Item */}
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Control: Lebih Besar & Modern */}
                        <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
                          <button 
                            onClick={() => updateQty(item.id, -1)}
                            className="px-4 py-2 bg-white hover:bg-gray-100 transition-colors text-gray-600 font-black text-lg border-r-2 border-gray-50"
                          >-</button>
                          <span className="text-sm px-4 font-black text-gray-700 min-w-[40px] text-center">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, 1)}
                            className="px-4 py-2 bg-white hover:bg-gray-100 transition-colors text-gray-600 font-black text-lg border-l-2 border-gray-50"
                          >+</button>
                        </div>

                        {/* Tombol Hapus: Sebelah Kanan */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[11px] font-black text-red-400 hover:text-red-600 
                          uppercase tracking-widest transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* VIEW 2 & 3 tetap sama seperti sebelumnya, hanya styling tombol yang kita samakan */}
          {view === "qr" && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="p-6 bg-white border-4 border-double border-gray-100 rounded-[2.5rem] shadow-xl mb-8">
                <QRCodeCanvas value={`PAYMENT-SMK-STORE-${totalPrice}`} size={220} level="H" includeMargin={true} />
              </div>
              <div className="bg-blue-50 w-full p-6 rounded-2xl mb-8 border border-blue-100">
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-1">Total Tagihan</p>
                <h3 className="text-3xl font-black text-black-900 tracking-tighter">{formatRupiah(totalPrice)}</h3>
              </div>
              <button
                onClick={() => setView("struk")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black tracking-widest shadow-xl shadow-emerald-100 transition-all active:scale-95"
              >
                SAYA SUDAH MEMBAYAR
              </button>
              <button onClick={() => setView("cart")} className="mt-6 text-xs font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest">Kembali</button>
            </div>
          )}

          {/* VIEW 3: STRUK */}
          {view === "struk" && (
            <div className="bg-[#fdfdfd] border-2 border-gray-100 p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gray-300"></div>
               <div className="text-center mb-8">
                  <h3 className="font-black text-gray-800 text-lg uppercase">SMK Online Store</h3>
                  <p className="text-[9px] text-gray-400 uppercase font-bold tracking-[0.3em]">Official Digital Receipt</p>
               </div>
               <div className="space-y-4 mb-8 border-y-2 border-dashed border-gray-100 py-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-[13px] font-bold text-gray-600">
                      <span>{item.name} <span className="text-gray-300 ml-1">x{item.qty}</span></span>
                      <span>{formatRupiah(item.price * item.qty)}</span>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between font-black text-gray-900 text-lg tracking-tighter">
                  <span>TOTAL</span>
                  <span className="text-black-600">{formatRupiah(totalPrice)}</span>
               </div>
               <button
                onClick={handleCloseSidebar}
                className="w-full bg-gray-600 hover:bg-black text-white py-4 rounded-2xl font-black tracking-widest shadow-xl mt-12 transition-all active:scale-95"
              >
                SELESAI
              </button>
            </div>
          )}
        </div>

        {/* Footer Fixed */}
        {view === "cart" && cartItems.length > 0 && (
          <div className="p-8 border-t-2 border-gray-50 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Subtotal</p>
                <span className="text-2xl font-black text-gray-800 tracking-tighter">{formatRupiah(totalPrice)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-blue-50 text-black-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                  {cartItems.length} Produk
                </span>
              </div>
            </div>
            {/* Update Tombol: Lebih Lebar, Berjarak (Padding & Margin), dan Tengah */}
            <button
              onClick={() => setView("qr")}
              className="w-full py-6 bg-gray-800 hover:bg-black text-white rounded-[1.5rem] 
              font-black tracking-[0.15em] transition-all transform active:scale-[0.97] shadow-2xl shadow-gray-200 uppercase text-sm"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;