import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import "../cssnya/bidang.css";

export default function Sertifikasi() {
  const navigate = useNavigate();
  const [sertifikasis, setSertifikasis] = useState([]);
  const [pelatihans, setPelatihans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id_pelatihan, setIdPelatihan] = useState("");
  const [tanggal_dan_bulan, setTanggal] = useState("");
  const [file_pdf, setFilePdf] = useState(null);
  const [selectedSertifikasi, setSelectedSertifikasi] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/sertifikasi");
      setSertifikasis(res.data);
    } catch (error) {
      console.error("Gagal mengambil data sertifikasi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPelatihan = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pelatihan");
      setPelatihans(res.data);
    } catch (error) {
      console.error("Gagal mengambil data pelatihan:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPelatihan();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin akan menghapus data ini?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/api/sertifikasi/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log("Gagal menghapus data:", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-sertifikat/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file_pdf) {
      alert("Harap unggah file PDF terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file_pdf", file_pdf);
    formData.append("tanggal_dan_bulan", tanggal_dan_bulan);
    formData.append("id_pelatihan", id_pelatihan);

    try {
      await axios.post("http://localhost:3000/api/sertifikasi", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIdPelatihan("");
      setTanggal("");
      setFilePdf(null);
      fetchData();
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
    } finally {
      const modalEl = document.getElementById("exampleModal");
      const modalInstance = Modal.getOrCreateInstance(modalEl);
      modalInstance.hide();
      document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
    }
  };

  const handleDetail = (sertifikasi) => {
    setSelectedSertifikasi(sertifikasi);
    const detailModal = new Modal(document.getElementById("detailModal"));
    detailModal.show();
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4 bidang-container">
        <div className="card">
          <h1 className="card-header text-white fw-bold fs-4 bidang-header">
            Data Sertifikasi
          </h1>
          <div className="card-body">
            <button
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Tambah Sertifikasi
            </button>

            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>No</th>
                  <th>Nama Dokumen</th>
                  <th>Tanggal</th>
                  <th>Pelatihan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {sertifikasis.map((sertifikat, index) => (
                  <tr key={sertifikat.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a
                        href={`http://localhost:3000/uploads/sertifikasi/${sertifikat.nama_dokumen}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {sertifikat.nama_dokumen}
                      </a>
                    </td>
                    <td>
                      {new Date(
                        sertifikat.tanggal_dan_bulan
                      ).toLocaleDateString()}
                    </td>
                    <td>{sertifikat.pelatihan?.nama_pelatihan || "-"}</td>
                    <td>
                      {/* <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleDetail(sertifikat)}
                      >
                        Detail
                      </button> */}
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(sertifikat.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(sertifikat.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Tambah Sertifikasi */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Tambah Sertifikasi</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control text-black"
                    id="tanggal"
                    value={tanggal_dan_bulan}
                    onChange={(e) => setTanggal(e.target.value)}
                    required
                  />
                  <label htmlFor="tanggal">Tanggal dan Bulan</label>
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="pelatihan"
                    value={id_pelatihan}
                    onChange={(e) => setIdPelatihan(e.target.value)}
                    required
                  >
                    <option value="">Pilih Pelatihan</option>
                    {pelatihans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama_pelatihan}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="pelatihan">Pelatihan</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="file_pdf" className="form-label">
                    Upload File PDF
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="form-control text-black"
                    id="file_pdf"
                    onChange={(e) => setFilePdf(e.target.files[0])}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Tutup
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     
    
    </>
  );
}





// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// export default function Sertifikasi() {
//    const navigate = useNavigate(); 
//   const [sertifikasiList, setSertifikasiList] = useState([]);
//   const [pelatihanList, setPelatihanList] = useState([]);
//   const [id_pelatihan, setIdPelatihan] = useState("");
//   const [tanggal_dan_bulan, setTanggal] = useState("");
//   const [file_pdf, setFilePdf] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Ambil semua data sertifikasi
//   const fetchSertifikasi = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/sertifikasi");
//       setSertifikasiList(res.data);
//     } catch (error) {
//       console.error("Gagal mengambil data sertifikasi:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Ambil semua pelatihan (untuk dropdown)
//   const fetchPelatihan = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/pelatihan");
//       setPelatihanList(res.data);
//     } catch (error) {
//       console.error("Gagal mengambil data pelatihan:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSertifikasi();
//     fetchPelatihan();
//   }, []);

//     const handleEdit = (id) => {
//     navigate(`/edit-sertifikat/${id}`);
//   };


//   // Tambah data sertifikasi
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file_pdf) {
//       alert("Harap unggah file PDF terlebih dahulu!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file_pdf", file_pdf);
//     formData.append("tanggal_dan_bulan", tanggal_dan_bulan);
//     formData.append("id_pelatihan", id_pelatihan);

//     try {
//       await axios.post("http://localhost:3000/api/sertifikasi", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       fetchSertifikasi();
//       setIdPelatihan("");
//       setTanggal("");
//       setFilePdf(null);
//       Modal.getInstance(document.getElementById("exampleModal")).hide();
//     } catch (error) {
//       console.error("Gagal menambahkan sertifikasi:", error);
//       alert(error.response?.data?.message || "Terjadi kesalahan.");
//     }
//   };

//   // Hapus sertifikasi
//   const handleDelete = async (id) => {
//     if (!window.confirm("Yakin ingin menghapus sertifikasi ini?")) return;
//     try {
//       await axios.delete(`http://localhost:3000/api/sertifikasi/${id}`);
//       fetchSertifikasi();
//     } catch (error) {
//       console.error("Gagal menghapus:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <div className="spinner-border text-primary" role="status"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <h1 className="card-header bg-primary text-white">Data Sertifikasi</h1>
//         <div className="card-body">
//           <button
//             className="btn btn-primary mb-3"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal"
//           >
//             Tambah Sertifikasi
//           </button>

//           <table className="table table-striped table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>No</th>
//                 <th>Nama Dokumen</th>
//                 <th>Tanggal</th>
//                 <th>Pelatihan</th>
//                 <th>Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sertifikasiList.map((sertifikat, index) => (
//                 <tr key={sertifikat.id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <a
//                       href={`http://localhost:3000/uploads/sertifikasi/${sertifikat.nama_dokumen}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {sertifikat.nama_dokumen}
//                     </a>
//                   </td>
//                   <td>{new Date(sertifikat.tanggal_dan_bulan).toLocaleDateString()}</td>
//                   <td>{sertifikat.pelatihan?.nama_pelatihan || "-"}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm me-2"
//                       onClick={() => handleDelete(sertifikat.id)}
//                     >
//                       Hapus
//                     </button>
//                      <button
//                         className="btn btn-warning btn-sm me-2"
//                         onClick={() => handleEdit(sertifikat.id)}
//                       >
//                         Edit
//                       </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal Tambah Sertifikasi */}
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content ">
//             <form onSubmit={handleSubmit}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Tambah Sertifikasi</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>
//               </div>

//               <div className="modal-body">
//                 <div className="form-floating mb-3">
//                   <input
//                     type="date"
//                     className="form-control text-black"
//                     id="tanggal"
//                     value={tanggal_dan_bulan}
//                     onChange={(e) => setTanggal(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="tanggal">Tanggal dan Bulan</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <select
//                     className="form-select"
//                     id="pelatihan"
//                     value={id_pelatihan}
//                     onChange={(e) => setIdPelatihan(e.target.value)}
//                     required
//                   >
//                     <option value="">Pilih Pelatihan</option>
//                     {pelatihanList.map((p) => (
//                       <option key={p.id} value={p.id}>
//                         {p.nama_pelatihan}
//                       </option>
//                     ))}
//                   </select>
//                   <label htmlFor="pelatihan">Pelatihan</label>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="file_pdf" className="form-label">
//                     Upload File PDF
//                   </label>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     className="form-control text-black"
//                     id="file_pdf"
//                     onChange={(e) => setFilePdf(e.target.files[0])}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                   Tutup
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Simpan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
