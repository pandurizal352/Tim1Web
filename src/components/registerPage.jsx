import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [nama_institusi, setNamaInstitusi] = useState("");
  const [email_perusahaan, setEmailPerusahaan] = useState("");
  const [telpn_perusahaan, setTelpnPerusahaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/api/user/register", {
        nama_institusi,
        email_perusahaan,
        telpn_perusahaan,
        alamat,
        posisi: "user", // <-- otomatis menjadi 'user'
        password,
      });

      alert("Registrasi berhasil!");
      navigate("/login");
    } catch (error) {
      console.error("Gagal registrasi:", error);
      alert("Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="d-flex shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ width: "900px", height: "550px" }}
      >
        {/* Bagian kiri - Welcome */}
        <div
          className="w-50 d-flex flex-column justify-content-center px-5 text-white"
          style={{
            background: "linear-gradient(135deg, #1B3C53, #6b7280)",
          }}
        >
          <h1 className="fw-bold mb-3">Create an Account</h1>
          <p className="small">
            Daftarkan institusi Anda untuk menggunakan sistem pelaporan ini.
            Dapatkan akses penuh ke fitur kami dan mulai kelola data dengan lebih mudah.
          </p>
        </div>

        {/* Bagian kanan - Form Register */}
        <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-white p-4">
          <h2 className="fw-semibold mb-4 text-secondary">REGISTER</h2>
          <form className="w-75" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nama Institusi"
                className="form-control rounded-pill text-black"
                value={nama_institusi}
                onChange={(e) => setNamaInstitusi(e.target.value)}
                required
              />
            </div>
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
                type="text"
                placeholder="Telepon Perusahaan"
                className="form-control rounded-pill text-black"
                value={telpn_perusahaan}
                onChange={(e) => setTelpnPerusahaan(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Alamat Perusahaan"
                className="form-control rounded-pill text-black"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>

            {/* posisi di-hidden agar user tidak bisa mengubah */}
            <input type="hidden" value="user" />

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
              className="btn w-100 rounded-pill text-white fw-semibold"
              style={{ backgroundColor: "#D2C1B6" }}
              disabled={loading}
            >
              {loading ? "Processing..." : "REGISTER"}
            </button>

            <p className="small text-center mt-3">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-decoration-none fw-semibold"
                style={{ color: "#1B3C53" }}
              >
                Login di sini
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;







// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RegisterPage = () => {
//   const [nama_institusi, setNamaInstitusi] = useState("");
//   const [email_perusahaan, setEmailPerusahaan] = useState("");
//   const [telpn_perusahaan, setTelpnPerusahaan] = useState("");
//   const [alamat, setAlamat] = useState("");
//   const [posisi, setPosisi] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     console.log({
//   nama_institusi,
//   email_perusahaan,
//   telpn_perusahaan,
//   alamat,
//   posisi,
//   password,
// });

//     try {
//       await axios.post("http://localhost:3000/api/user/register", {
//         nama_institusi,
//         email_perusahaan,
//         telpn_perusahaan,
//         alamat,
//         posisi,
//         password,
//       });

//       alert("Registrasi berhasil!");
//       navigate("/login");
//     } catch (error) {
//       console.error("Gagal registrasi:", error);
//       alert("Terjadi kesalahan saat registrasi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
//       <div
//         className="d-flex shadow-lg rounded-4 overflow-hidden bg-white"
//         style={{ width: "900px", height: "550px" }}
//       >
//         {/* Bagian kiri - Welcome */}
//         <div
//           className="w-50 d-flex flex-column justify-content-center px-5 text-white"
//           style={{
//             background: "linear-gradient(135deg, #1B3C53, #6b7280)",
//           }}
//         >
//           <h1 className="fw-bold mb-3">Create an Account</h1>
//           <p className="small">
//             Daftarkan institusi Anda untuk menggunakan sistem pelaporan ini.
//             Dapatkan akses penuh ke fitur kami dan mulai kelola data dengan lebih mudah.
//           </p>
//         </div>

//         {/* Bagian kanan - Form Register */}
//         <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-white p-4">
//           <h2 className="fw-semibold mb-4 text-secondary">REGISTER</h2>
//           <form className="w-75" onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Nama Institusi"
//                 className="form-control rounded-pill text-black"
//                 value={nama_institusi}
//                 onChange={(e) => setNamaInstitusi(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 placeholder="Email Perusahaan"
//                 className="form-control rounded-pill text-black"
//                 value={email_perusahaan}
//                 onChange={(e) => setEmailPerusahaan(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Telepon Perusahaan"
//                 className="form-control rounded-pill text-black"
//                 value={telpn_perusahaan}
//                 onChange={(e) => setTelpnPerusahaan(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Alamat Perusahaan"
//                 className="form-control rounded-pill text-black"
//                 value={alamat}
//                 onChange={(e) => setAlamat(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Posisi"
//                 className="form-control rounded-pill text-black"
//                 value={posisi}
//                 onChange={(e) => setPosisi(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="form-control rounded-pill text-black"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn w-100 rounded-pill text-white fw-semibold"
//               style={{ backgroundColor: "#D2C1B6" }}
//               disabled={loading}
//             >
//               {loading ? "Processing..." : "REGISTER"}
//             </button>

//             <p className="small text-center mt-3">
//               Sudah punya akun?{" "}
//               <a
//                 href="/login"
//                 className="text-decoration-none fw-semibold"
//                 style={{ color: "#1B3C53" }}
//               >
//                 Login di sini
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
