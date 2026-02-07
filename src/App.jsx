import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import Login from './components/Login';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const API_URL = "https://6982bcb29c3efeb892a3255e.mockapi.io/online";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    fetchProducts();
  }, []);

  // Fungsi untuk mengambil data produk dari API
  const fetchProducts = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error ambil data:", err);
        setLoading(false);
      });
  };

  // --- LOGIKA ADMIN ---

  // 1. Fungsi Hapus Produk
  const handleDeleteProduct = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (res.ok) {
          // Update state lokal agar produk langsung hilang dari layar
          setProducts(prev => prev.filter(p => p.id !== id));
          alert("Produk berhasil dihapus!");
        }
      })
      .catch(err => alert("Gagal menghapus produk"));
    }
  };

  // 2. Fungsi Edit Produk (Placeholder)
  const handleEditProduct = (product) => {
    // Untuk saat ini kita gunakan prompt sederhana, 
    // kedepannya kamu bisa mengganti ini dengan Modal Form
    const newName = prompt("Masukkan nama baru:", product.name);
    const newPrice = prompt("Masukkan harga baru:", product.price);

    if (newName && newPrice) {
      fetch(`${API_URL}/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, price: Number(newPrice) })
      })
      .then(res => res.json())
      .then(updatedData => {
        // Update state lokal dengan data yang baru diupdate
        setProducts(prev => prev.map(p => p.id === product.id ? updatedData : p));
        alert("Produk berhasil diupdate!");
      })
      .catch(err => alert("Gagal mengupdate produk"));
    }
  };

  // --- LOGIKA KERANJANG & USER ---

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return {...item, qty: Math.max(1, item.qty + amount)};
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Header 
        cartCount={cart.reduce((a, c) => a + c.qty, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        closeCart={() => setIsCartOpen(false)} 
        cartItems={cart} 
        updateQty={updateQty} 
        removeItem={removeItem} 
      />

      <main className="container">
        <div style={{ margin: "20px 0", textAlign: "right" }}>
            <span>Selamat datang, <strong>{user.name}</strong> ({user.role})</span>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading.....</p>
        ) : (
          <ProductList 
            products={products} 
            onAddToCart={addToCart} 
            role={user?.role} 
            onDelete={handleDeleteProduct} // Kirim fungsi hapus
            onEdit={handleEditProduct}     // Kirim fungsi edit
          />
        )}
      </main>
    </>
  );
}

export default App;