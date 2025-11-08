import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import NavbarUser from "./components/NavbarUser";
import Chatbot from "./components/Chatbot.jsx";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import Beranda from "./components/pages/Beranda";
import Bidang from "./components/pages/Bidang";
import Pelatihan from "./components/pages/Pelatihan";
import EditPelatihan from "./components/pages/EditPelatihan";
import EditBidang from "./components/pages/EditBidang";
import PesertaAdmin from "./components/pages/pesertaAdmin.jsx";
import Pivot from "./components/pages/pivot.jsx";
import EditPivot from "./components/pages/EditPivot.jsx";
import EditPesertaAdmin from "./components/pages/EditPesertaAdmin.jsx";
import LandingPage from "./components/pages/LandingPage";
import PesertaUser from "./components/pages/pesertaUser";
import TentangKami from "./components/pages/tentangKami.jsx";
import DaftarUser from "./components/pages/formPesertaUser.jsx";
import Sertifikat from "./components/pages/sertifikat.jsx";
import LBSMK3 from "./components/pages/smk3.jsx";
import LBK3Umum from "./components/pages/k3Umum.jsx";
import LBKetinggian from "./components/pages/ketinggian.jsx";
import LBKesehatan from "./components/pages/kesehatan.jsx";
import LBlistrik from "./components/pages/listrik.jsx";
import LBErgonomi from "./components/pages/ErgonomiLingkunganKerja.jsx";
import EditSertifikat from "./components/pages/EditSertifikat.jsx";
import DaftaUserAdmin from "./components/pages/DataUserAdmin.jsx";
import EditDaftarUserAdmin from "./components/pages/EditDataUserAdmin.jsx";

import Footer from "./components/footer";

// Komponen ProtectedRoute
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const posisi = localStorage.getItem("posisi");

//   if (!token) return <Navigate to="/login" replace />;
//   if (allowedRoles && !allowedRoles.includes(posisi)) {
//     if (posisi === "admin") return <Navigate to="/bidang" replace />;
//     if (posisi === "user") return <Navigate to="/" replace />;
//   }

//   return children;
// };

// Komponen ProtectedRoute — FIXED VERSION
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const posisi = localStorage.getItem("posisi");

  // Jika token tidak ada → langsung logout
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Cek apakah token expired
  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("posisi");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("posisi");
    return <Navigate to="/login" replace />;
  }

  // Cek role
  if (allowedRoles && !allowedRoles.includes(posisi)) {
    return <Navigate to="/" replace />;
  }

  return children;
};



// ⬇️ Komponen pembungkus navbar
function NavbarWrapper() {
  const [posisi, setPosisi] = useState(localStorage.getItem("posisi"));
  const location = useLocation();

  useEffect(() => {
    setPosisi(localStorage.getItem("posisi"));
  }, [location]);

  return posisi === "admin" ? <Navbar /> : <NavbarUser />;
}

export default function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <Chatbot/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

       
         <Route path="/LBSMK3" element={<LBSMK3 />} />
         <Route path="/LBK3Umum" element={<LBK3Umum />} />
         <Route path="/LBKetinggian" element={<LBKetinggian />} />
         <Route path="/LBKesehatan" element={<LBKesehatan />} />
         <Route path="/LBlistrik" element={<LBlistrik />} />
         <Route path="/LBErgonomi" element={<LBErgonomi />} />
         
        
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pesertaUser" element={<PesertaUser />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
         <Route path="/daftar" element={<DaftarUser />} />
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Beranda />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bidang"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Bidang />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-bidang/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditBidang />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pelatihan"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Pelatihan />
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit-pelatihan/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditPelatihan />
            </ProtectedRoute>
          }
        />
            <Route
          path="/sertifikat"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Sertifikat />
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit-sertifikat/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditSertifikat />
            </ProtectedRoute>
          }
        />
            <Route
          path="/peserta"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PesertaAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-peserta/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditPesertaAdmin />
            </ProtectedRoute>
          }
        />
         <Route
          path="/pivot"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Pivot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DataUser"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DaftaUserAdmin />
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit-pivot/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditPivot />
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit-datauser/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditDaftarUserAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <br></br>

      <Footer />
    </BrowserRouter>
  );
}






// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Navbar from "./components/Navbar";
// import NavbarUser from "./components/NavbarUser";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/loginPage";
// import RegisterPage from "./components/registerPage";
// import Beranda from "./components/pages/Beranda";
// import Bidang from "./components/pages/Bidang";
// import Pelatihan from "./components/pages/Pelatihan";
// import EditBidang from "./components/pages/EditBidang";
// import LandingPage from "./components/pages/LandingPage";
// import PesertaUser from "./components/pages/pesertaUser";
// import TentangKami from "./components/pages/tentangKami.jsx";
// import Footer from "./components/footer";


// // Komponen ProtectedRoute khusus yang cek token & posisi
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const posisi = localStorage.getItem("posisi"); // Ambil posisi (role) dari localStorage

//   // Jika belum login
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Jika login tapi posisi tidak sesuai dengan halaman yang diakses
//   if (allowedRoles && !allowedRoles.includes(posisi)) {
//     // arahkan ke halaman default sesuai role-nya
//     if (posisi === "admin") return <Navigate to="/bidang" replace />;
//     if (posisi === "user") return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default function App() {
  
// const posisi = localStorage.getItem("posisi");

//   return (
//     <React.StrictMode>
//       <BrowserRouter>
//         <div>
//             {posisi === "admin" ? <Navbar /> : <NavbarUser />}
//           <Routes>
//             {/* Halaman umum */}
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/pesertaUser" element={<PesertaUser />} />
//             <Route path="/tentang-kami" element={<TentangKami />} />
            
//               <Route path="/" element={<LandingPage />} />
            
//                 <Route path="/admin" element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <Beranda />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Halaman untuk user */}
//             {/* <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute allowedRoles={["user"]}>
//                   <Beranda />
//                 </ProtectedRoute>
//               }
//             /> */}
            
//             {/* <Route
//               path="/pelatihan"
//               element={
//                 <ProtectedRoute allowedRoles={["user"]}>
//                   <Pelatihan />
//                 </ProtectedRoute>
//               }
//             /> */}
               
//             <Route
//               path="/pelatihan"
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <Pelatihan />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Halaman untuk admin */}
//             <Route
//               path="/bidang"
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <Bidang />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/edit-bidang/:id"
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <EditBidang />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Redirect otomatis jika halaman tidak ditemukan */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//           <br />
//           <Footer />
//         </div>
//       </BrowserRouter>
//     </React.StrictMode>
//   );
// }


