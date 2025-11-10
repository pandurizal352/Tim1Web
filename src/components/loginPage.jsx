import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email_perusahaan, setEmailPerusahaan] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/user/login", {
        email_perusahaan,
        password,
      });

      const { token, user } = response.data;

      // Simpan token dan posisi ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("posisi", user.posisi);

      alert("Login berhasil!");

      // Arahkan sesuai posisi user
      if (user.posisi === "Admin" || user.posisi === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Gagal login:", error);
      alert(error.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      
      <div
        className="d-flex shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ width: "900px", height: "500px" }}
      >
        {/* Kiri */}
        <div
          className="w-50 d-flex flex-column justify-content-center px-5 text-white"
          style={{ background: "linear-gradient(135deg, #1B3C53, #6b7280)" }}
        >
          <h1 className="fw-bold mb-3">Welcome to Website</h1>
          <p className="small">
            Masuk untuk melanjutkan aktivitas Anda dalam sistem pelaporan ini.
          </p>
        </div>

        {/* Kanan */}
        <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-white p-4">
          <h2 className="fw-semibold mb-4 text-secondary">LOGIN</h2>
          <form className="w-75" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email Perusahaan"
                className="form-control rounded-pill text-black"
                value={email_perusahaan}
                onChange={(e) => setEmailPerusahaan(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control rounded-pill text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 rounded-pill text-white fw-semibold "
              style={{ backgroundColor: "#D2C1B6" }}
              disabled={loading}
            >
              {loading ? "Memproses..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
