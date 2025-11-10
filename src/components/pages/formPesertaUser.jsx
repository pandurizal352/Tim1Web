import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";

export default function FormPeserta() {
  const [pesertaList, setPesertaList] = useState([
    { nama_peserta: "", email_peserta: "", telpn_peserta: "", alamat_peserta: "" },
  ]);

  const [pelatihans, setPelatihans] = useState([]);
  const [filteredPelatihans, setFilteredPelatihans] = useState([]);
  const [bidangs, setBidangs] = useState([]);
  const [userData, setUserData] = useState(null);

  const [id_Pelatihan, setId_Pelatihan] = useState("");
  const [id_Bidang, setId_Bidang] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // 🔥 state untuk biaya
  const [totalBiaya, setTotalBiaya] = useState(0);

  // 🔥 Ambil user dari token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserById(decoded.id);
    }
  }, []);

  const fetchUserById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/User/${id}`);
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.log("Error fetching user:", err);
    }
  };

  const fetchPelatihan = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/Pelatihan");
      const data = await res.json();
      setPelatihans(data);
    } catch (err) {
      console.log("Error fetching pelatihan:", err);
    }
  };

  const fetchBidang = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/Bidang");
      const data = await res.json();
      setBidangs(data);
    } catch (err) {
      console.log("Error fetching bidang:", err);
    }
  };

  useEffect(() => {
    fetchPelatihan();
    fetchBidang();
  }, []);

  // 🔥 Filter pelatihan berdasarkan bidang
  useEffect(() => {
    if (id_Bidang) {
      const filtered = pelatihans.filter(
        (p) => p.id_bidang === parseInt(id_Bidang)
      );
      setFilteredPelatihans(filtered);
      setId_Pelatihan("");
    } else {
      setFilteredPelatihans([]);
    }
  }, [id_Bidang, pelatihans]);

  // ============================
  // 🔥 HITUNG TOTAL BIAYA OTOMATIS
  // ============================
  useEffect(() => {
    if (!id_Pelatihan) {
      setTotalBiaya(0);
      return;
    }

    const pelatihan = pelatihans.find(
      (p) => p.id === parseInt(id_Pelatihan)
    );

    if (!pelatihan) return;

    const biaya = parseFloat(pelatihan.biaya); // decimal dari prisma
    const jumlahPeserta = pesertaList.length;

    setTotalBiaya(biaya * jumlahPeserta);
  }, [id_Pelatihan, pesertaList, pelatihans]);

  // ============================
  // Input Dinamis Peserta
  // ============================
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...pesertaList];
    updated[index][name] = value;
    setPesertaList(updated);
  };

  const handleAddPeserta = () => {
    setPesertaList([
      ...pesertaList,
      { nama_peserta: "", email_peserta: "", telpn_peserta: "", alamat_peserta: "" },
    ]);
  };

  const handleRemovePeserta = (index) => {
    setPesertaList(pesertaList.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  // ============================
  // 🔥 Submit Data
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("peserta", JSON.stringify(pesertaList));
      formData.append("id_user", userData?.id);
      formData.append("id_pelatihan", id_Pelatihan);
      formData.append("id_bidang", id_Bidang);
      formData.append("total_biaya", totalBiaya); // ⬅️ kirim total biaya ke backend

      if (uploadedFile) {
        formData.append("bukti_pembayaran", uploadedFile);
      }

      const response = await fetch("http://localhost:3000/api/Peserta/tambahpeserta", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Semua peserta berhasil didaftarkan!");
        setPesertaList([{ nama_peserta: "", email_peserta: "", telpn_peserta: "", alamat_peserta: "" }]);
        setId_Bidang("");
        setId_Pelatihan("");
        setUploadedFile(null);
        setTotalBiaya(0);
        fileInputRef.current.value = null;
      } else {
        alert("❌ Gagal menambahkan peserta: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
          alert(error.response.data.message); // munculin alert kalo nama bidang duplikat
        } else {
          alert("Email peserta sudah ada.");
          console.error(error);
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
      <div className="container d-flex shadow-lg rounded-4 overflow-hidden bg-white" style={{ maxWidth: "1100px" }}>

        {/* KIRI */}
        <div
          className="w-50 d-flex flex-column justify-content-center px-5 text-white"
          style={{
            background: "linear-gradient(135deg, rgba(35, 27, 83, 1), rgba(92, 0, 69, 0.39))",
          }}
        >
          <h1 className="fw-bold mb-3">Daftar Peserta</h1>
          <p>Tambahkan beberapa peserta sekaligus untuk pelatihan Anda.</p>
        </div>

        {/* KANAN */}
        <div className="w-50 d-flex flex-column bg-white p-4" style={{ maxHeight: "90vh", overflowY: "auto" }}>
          <div className="w-100 px-3">

            <h2 className="fw-semibold mb-4 text-secondary text-center">DAFTAR</h2>

            {/* Instansi */}
            <div className="mb-3">
              <label>Instansi</label>
              <input type="text" className="form-control" value={userData ? userData.nama_institusi : "Memuat..."} readOnly />
            </div>

            {/* Bidang */}
            <div className="mb-3">
              <label>Bidang</label>
              <select className="form-select" value={id_Bidang} onChange={(e) => setId_Bidang(e.target.value)} required>
                <option value="">Pilih Bidang</option>
                {bidangs.map((b) => (
                  <option key={b.id} value={b.id}>{b.nama_bidang}</option>
                ))}
              </select>
            </div>

            {/* Pelatihan */}
            <div className="mb-3">
              <label>Pelatihan</label>
              <select
                className="form-select"
                value={id_Pelatihan}
                onChange={(e) => setId_Pelatihan(e.target.value)}
                required
                disabled={!id_Bidang}
              >
                <option value="">
                  {id_Bidang ? "Pilih Pelatihan" : "Pilih Bidang terlebih dahulu"}
                </option>
                {filteredPelatihans.map((p) => (
                  <option key={p.id} value={p.id}>{p.nama_pelatihan}</option>
                ))}
              </select>
            </div>

            {/* Upload File */}
            <div className="mb-3">
              <label>Upload File</label>
              <input type="file" className="form-control" ref={fileInputRef} onChange={handleFileChange} />
              {uploadedFile && <small className="text-muted">File: {uploadedFile.name}</small>}
            </div>

            {/* 🔥 TOTAL BIAYA */}
          <div className="alert alert-info text-center fw-bold">
  Total Biaya:{" "}
  {totalBiaya > 0
    ? `Rp. ${Number(totalBiaya).toLocaleString("id-ID")}`
    : "Rp. 0"}
</div>


            {/* FORM PESERTA DINAMIS */}
            {pesertaList.map((peserta, index) => (
              <div key={index} className="border p-3 mb-3 rounded bg-light-subtle">
                <h5>Peserta {index + 1}</h5>

                <input
                  type="text"
                  name="nama_peserta"
                  value={peserta.nama_peserta}
                  placeholder="Nama Peserta"
                  onChange={(e) => handleInputChange(index, e)}
                  className="form-control mb-2"
                  required
                />

                <input
                  type="email"
                  name="email_peserta"
                  value={peserta.email_peserta}
                  placeholder="Email Peserta"
                  onChange={(e) => handleInputChange(index, e)}
                  className="form-control mb-2"
                  required
                />

                <input
                  type="text"
                  name="telpn_peserta"
                  value={peserta.telpn_peserta}
                  placeholder="Telepon Peserta"
                  onChange={(e) => handleInputChange(index, e)}
                  className="form-control mb-2"
                  required
                />

                <input
                  type="text"
                  name="alamat_peserta"
                  value={peserta.alamat_peserta}
                  placeholder="Alamat Peserta"
                  onChange={(e) => handleInputChange(index, e)}
                  className="form-control mb-3"
                  required
                />

                {pesertaList.length > 1 && (
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemovePeserta(index)}>
                    Hapus Peserta
                  </button>
                )}
              </div>
            ))}

            {/* Tambah Peserta */}
            <button type="button" className="btn btn-outline-secondary w-100 mb-3" onClick={handleAddPeserta}>
              + Tambah Peserta
            </button>

            {/* Submit */}
            <button
              type="button"
              className="btn w-100 rounded-pill text-white fw-semibold"
              style={{ backgroundColor: "#D2C1B6" }}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Processing..." : "DAFTARKAN SEMUA"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}






// import { useEffect, useState } from "react";

// export default function FormPeserta() {
//   const [pesertaList, setPesertaList] = useState([
//     { nama_peserta: "", email_peserta: "", telpn_peserta: "", alamat_peserta: "" },
//   ]);

//   const [pelatihans, setPelatihans] = useState([]);
//   const [bidangs, setBidangs] = useState([]); // ✅ Tambahkan ini
//   const [users, setUsers] = useState([]);
//   const [id_Pelatihan, setId_Pelatihan] = useState("");
//   const [id_User, setId_User] = useState("");
//   const [id_Bidang, setId_Bidang] = useState("");
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Ambil data user, pelatihan, bidang
//   const fetchPelatihan = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/Pelatihan");
//       const data = await res.json();
//       setPelatihans(data);
//     } catch (err) {
//       console.log("Error fetching pelatihan:", err);
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/User");
//       const data = await res.json();
//       setUsers(data);
//     } catch (err) {
//       console.log("Error fetching user:", err);
//     }
//   };

//   const fetchBidang = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/Bidang");
//       const data = await res.json();
//       setBidangs(data);
//     } catch (err) {
//       console.log("Error fetching bidang:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPelatihan();
//     fetchUser();
//     fetchBidang();
//   }, []);

//   // Fungsi input dinamis
//   const handleInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedList = [...pesertaList];
//     updatedList[index][name] = value;
//     setPesertaList(updatedList);
//   };

//   const handleAddPeserta = () => {
//     setPesertaList([
//       ...pesertaList,
//       { nama_peserta: "", email_peserta: "", telpn_peserta: "", alamat_peserta: "" },
//     ]);
//   };

//   const handleRemovePeserta = (index) => {
//     setPesertaList(pesertaList.filter((_, i) => i !== index));
//   };

//   const handleFileChange = (e) => {
//     setUploadedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("peserta", JSON.stringify(pesertaList));
//       formData.append("id_user", id_User);
//       formData.append("id_pelatihan", id_Pelatihan);
//       formData.append("id_bidang", id_Bidang);

//       if (uploadedFile) {
//         formData.append("bukti_pembayaran", uploadedFile);
//       }

//       const response = await fetch("http://localhost:3000/api/Peserta/tambahpeserta", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert("✅ Semua peserta berhasil didaftarkan!");
//         setPesertaList([{ nama_peserta: "", email_peserta: "", telpn_peserta: "", alamat_peserta: "" }]);
//         setId_User("");
//         setId_Pelatihan("");
//         setId_Bidang("");
//         setUploadedFile(null);

//         const fileInput = document.getElementById("uploadFile");
//         if (fileInput) fileInput.value = "";
//       } else {
//         alert("❌ Gagal menambahkan peserta: " + (result.message || "Unknown error"));
//       }
//     } catch (err) {
//       alert("❌ Gagal menambahkan peserta: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
//       <div className="container d-flex shadow-lg rounded-4 overflow-hidden bg-white" style={{ maxWidth: "1100px" }}>
//         {/* Kiri */}
//         <div
//           className="w-50 d-flex flex-column justify-content-center px-5 text-white"
//           style={{
//             background: "linear-gradient(135deg, rgba(35, 27, 83, 1), rgba(92, 0, 69, 0.39))",
//           }}
//         >
//           <h1 className="fw-bold mb-3">Daftar Peserta</h1>
//           <p className="medium">Tambahkan beberapa peserta sekaligus untuk pelatihan Anda di sini.</p>
//         </div>

//         {/* Kanan */}
//         <div className="w-50 d-flex flex-column justify-content-start bg-white p-4" style={{ maxHeight: "90vh", overflowY: "auto" }}>
//           <div className="w-100 px-3">
//             <h2 className="fw-semibold mb-4 text-secondary text-center">DAFTAR</h2>

//             {/* Instansi */}
//             <div className="mb-3">
//               <label htmlFor="id_User">Instansi</label>
//               <select
//                 className="form-select"
//                 id="id_User"
//                 value={id_User}
//                 onChange={(e) => setId_User(e.target.value)}
//                 required
//               >
//                 <option value="">Pilih Instansi</option>
//                 {users.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.nama_institusi}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Bidang */}
//             <div className="mb-3">
//               <label htmlFor="id_Bidang">Bidang</label>
//               <select
//                 className="form-select"
//                 id="id_Bidang"
//                 value={id_Bidang}
//                 onChange={(e) => setId_Bidang(e.target.value)}
//                 required
//               >
//                 <option value="">Pilih Bidang</option>
//                 {bidangs.map((b) => (
//                   <option key={b.id} value={b.id}>
//                     {b.nama_bidang}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Pelatihan */}
//             <div className="mb-3">
//               <label htmlFor="id_Pelatihan">Pelatihan</label>
//               <select
//                 className="form-select"
//                 id="id_Pelatihan"
//                 value={id_Pelatihan}
//                 onChange={(e) => setId_Pelatihan(e.target.value)}
//                 required
//               >
//                 <option value="">Pilih Pelatihan</option>
//                 {pelatihans.map((p) => (
//                   <option key={p.id} value={p.id}>
//                     {p.nama_pelatihan}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Upload File */}
//             <div className="mb-3">
//               <label htmlFor="uploadFile">Upload File (untuk semua peserta)</label>
//               <input type="file" className="form-control" id="uploadFile" onChange={handleFileChange} />
//               {uploadedFile && <small className="text-muted">File: {uploadedFile.name}</small>}
//             </div>

//             {/* Form Dinamis */}
//             {pesertaList.map((peserta, index) => (
//               <div key={index} className="border p-3 mb-3 rounded bg-light-subtle">
//                 <h5 className="mb-3">Peserta {index + 1}</h5>

//                 <input
//                   type="text"
//                   name="nama_peserta"
//                   value={peserta.nama_peserta}
//                   placeholder="Nama Peserta"
//                   onChange={(e) => handleInputChange(index, e)}
//                   className="form-control mb-2 text-black"
//                   required
//                 />

//                 <input
//                   type="email"
//                   name="email_peserta"
//                   value={peserta.email_peserta}
//                   placeholder="Email Peserta"
//                   onChange={(e) => handleInputChange(index, e)}
//                   className="form-control mb-2 text-black"
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="telpn_peserta"
//                   value={peserta.telpn_peserta}
//                   placeholder="Telepon Peserta"
//                   onChange={(e) => handleInputChange(index, e)}
//                   className="form-control mb-2 text-black"
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="alamat_peserta"
//                   value={peserta.alamat_peserta}
//                   placeholder="Alamat Peserta"
//                   onChange={(e) => handleInputChange(index, e)}
//                   className="form-control mb-3 text-black"
//                   required
//                 />

//                 {pesertaList.length > 1 && (
//                   <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemovePeserta(index)}>
//                     Hapus Peserta
//                   </button>
//                 )}
//               </div>
//             ))}

//             <button type="button" className="btn btn-outline-secondary w-100 mb-3" onClick={handleAddPeserta}>
//               + Tambah Peserta
//             </button>

//             <button
//               type="button"
//               className="btn w-100 rounded-pill text-white fw-semibold"
//               style={{ backgroundColor: "#D2C1B6" }}
//               disabled={loading}
//               onClick={handleSubmit}
//             >
//               {loading ? "Processing..." : "DAFTARKAN SEMUA"}
//             </button>

//             <p className="small text-center mt-3">
//               Lihat data peserta{" "}
//               <a href="/pesertaUser" className="text-decoration-none fw-semibold" style={{ color: "#1B3C53" }}>
//                 di sini
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
