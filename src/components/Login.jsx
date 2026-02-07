import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("https://6982bcb29c3efeb892a3255e.mockapi.io/users");
      const users = await response.json();

      const userFound = users.find(
        (u) => u.username === username && u.password === password
      );

      if (userFound) {
        localStorage.setItem("user", JSON.stringify(userFound));
        window.location.reload();
      } else {
        setError("Username atau password salah!");
      }
    } catch (err) {
      setError("Gagal menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[450px]">
        
        {/* Logo Section */}
        <div className="text-center mb-10 group">
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 italic transition-transform group-hover:scale-105 duration-300">
            SMK ONLINE <span className="text-red-500">STORE</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-[2px] w-8 bg-red-500"></div>
            <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.4em]">
              Login agar dapat acces
            </p>
            <div className="h-[2px] w-8 bg-red-500"></div>
          </div>
        </div>

        {/* Card Login */}
        <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
          {/* Aksesori Dekoratif */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="relative">
            <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
              Sign <span className="text-red-500">In</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium mb-8">
              Masukkan Username Dan Password Anda.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Input Username */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 text-gray-900 font-bold focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none placeholder:font-medium placeholder:text-gray-300"
                  placeholder="input your username"
                  required
                />
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 text-gray-900 font-bold focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none placeholder:font-medium placeholder:text-gray-300"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl border border-red-100 animate-shake">
                  ⚠️ {error}
                </div>
              )}

              {/* Button Login */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-gray-900 hover:bg-black'} text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl shadow-gray-200 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4 group`}
              >
                {isLoading ? "Authenticating..." : "Login Ke Sistem"}
                {!isLoading && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-10 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; 2026 SMK ONLINE STORE
        </p>
      </div>
    </div>
  );
}

export default Login;



//Username: admin Password: 123 => login sebagai admin
//Username: customer_budi password: 123 => login sebagai customer