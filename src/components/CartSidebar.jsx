import React from "react";

function CartSidebar({ isOpen, closeCart, cartItems, updateQty, removeItem }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] max-w-[90%] bg-white z-50
        shadow-xl transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Keranjang Belanja</h2>
          <button
            onClick={closeCart}
            aria-label="Close Cart"
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">
              Keranjang masih kosong
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-3 transition duration-300 hover:bg-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    {formatRupiah(item.price)}
                  </p>
                </div>

                {/* Qty Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    aria-label="Decrease Quantity"
                    className="w-8 h-8 flex items-center justify-center
                    border rounded-md text-sm hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    aria-label="Increase Quantity"
                    className="w-8 h-8 flex items-center justify-center
                    border rounded-md text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove Item"
                  className="text-red-500 hover:text-red-700 text-lg ml-2"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>

            <button
              onClick={() =>
                alert(
                  "Terima kasih sudah berbelanja! Fitur Payment belum tersedia."
                )
              }
              className="w-full bg-blue-600 hover:bg-blue-700
              text-white py-3 rounded-lg font-medium transition duration-300"
            >
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;