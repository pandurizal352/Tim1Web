import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import "../cssnya/bidang.css";

export default function Pelatihan() {
  const [pelatihans, setPelatihans] = useState([]);
  // const [pesertas, setPesertas] = useState([]);
  const [bidangs, setBidangs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [biaya, setBiaya] = useState("");
  const [jangka_waktu, setJangka_waktu] = useState("");
  const [nama_pelatihan, setNama_pelatihan] = useState("");
  // const [id_peserta, setPeserta] = useState("");
  const [id_Bidang, setId_Bidang] = useState("");

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/Pelatihan")
      .then((response) => setPelatihans(response.data))
      .catch((error) => console.log("Gagal mengambil data:", error))
      .finally(() => setLoading(false));
  };

  // const fetchPeserta = () => {
  //   axios
  //     .get("http://localhost:3000/api/Peserta")
  //     .then((res) => setPesertas(res.data))
  //     .catch((err) => console.log(err));
  // };

  const fetchBidang = () => {
    axios
      .get("http://localhost:3000/api/Bidang")
      .then((res) => setBidangs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    // fetchPeserta();
    fetchBidang();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Apakah kamu yakin akan menghapus data ini?")) return;
    axios
      .delete(`http://localhost:3000/api/Pelatihan/${id}`)
      .then(() => fetchData())
      .catch((error) => console.log("Gagal menghapus data:", error));
  };

  const handleEdit = (id) => navigate(`/edit-pelatihan/${id}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/Pelatihan", {
        nama_pelatihan,
        biaya: parseInt(biaya),
        jangka_waktu,
        // id_peserta: id_peserta || null,
        id_bidang: id_Bidang || null,
      })
      .then(() => {
        setBiaya("");
        setJangka_waktu("");
        setNama_pelatihan("");
        // setPeserta("");
        setId_Bidang("");
        fetchData();
      })
      .catch((error) => console.error("Gagal menambahkan data:", error))
      .finally(() => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.hide();
        document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
      });
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
            Data Pelatihan
          </h1>
          <div className="card-body">
            <button
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Tambah Data
            </button>

            <table className="table table-striped table-hover">
              <thead className="table-dark text-center">
                <tr>
                  <th>No</th>
                  <th>Nama Pelatihan</th>
                  <th>Biaya</th>
                  <th>Jangka Waktu</th>
                  <th>Bidang Terkait</th>
                  {/* <th>Peserta</th> */}
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pelatihans.map((pelatihan, index) => (
                  <tr key={pelatihan.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{pelatihan.nama_pelatihan}</td>
                    {/* <td>Rp. {pelatihan.biaya.toLocaleString("id-ID")}</td> */}
                    <td>
                    Rp. {Number(pelatihan.biaya).toLocaleString("id-ID")}
                    </td>
                    <td>{pelatihan.jangka_waktu}</td>
                    <td>{pelatihan.bidang?.nama_bidang || "-"}</td>
                    {/* <td>{pelatihan.peserta?.nama_peserta || "-"}</td> */}
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(pelatihan.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(pelatihan.id)}
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

      {/* Modal Tambah Data */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Tambah Data Pelatihan</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control text-black"
                    id="nama_pelatihan"
                    placeholder="Nama Bidang"
                    value={nama_pelatihan}
                    onChange={(e) => setNama_pelatihan(e.target.value)}
                    required
                  />
                  <label htmlFor="nama_pelatihan">Nama Pelatihan</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control text-black"
                    id="biaya"
                    placeholder="Biaya"
                    value={biaya}
                    onChange={(e) => setBiaya(e.target.value)}
                    required
                  />
                  <label htmlFor="biaya">Biaya</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="string"
                    className="form-control text-black"
                    id="jangka_waktu"
                    value={jangka_waktu}
                    onChange={(e) => setJangka_waktu(e.target.value)}
                    required
                  />
                  <label htmlFor="jangka_waktu">Jangka Waktu</label>
                </div>

                {/* <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="id_peserta"
                    value={id_peserta}
                    onChange={(e) => setPeserta(e.target.value)}
                  >
                    <option value="">Pilih Peserta (opsional)</option>
                    {pesertas.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id} - {p.nama_peserta}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="id_peserta">Peserta</label>
                </div> */}

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="id_Bidang"
                    value={id_Bidang}
                    onChange={(e) => setId_Bidang(e.target.value)}
                  >
                    <option value="">Pilih Bidang (opsional)</option>
                    {bidangs.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} - {b.nama_bidang}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="id_Bidang">Bidang</label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
// import { useNavigate } from "react-router-dom";
// import "../cssnya/bidang.css";

// export default function Pelatihan() {
//   const [pelatihans, setPelatihans] = useState([]);
//   const [pesertas, setPesertas] = useState([]);
//   const [bidangs, setBidangs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [biaya, setBiaya] = useState("");
//   const [jangka_waktu, setJangka_waktu] = useState("");
//   const [nama_bidang, setNama_bidang] = useState("");
//   const [id_peserta, setPeserta] = useState("");
//   const [id_Bidang, setId_Bidang] = useState("");

//   const navigate = useNavigate();

//   const fetchData = () => {
//     axios
//       .get("http://localhost:3000/api/Pelatihan")
//       .then((response) => setPelatihans(response.data))
//       .catch((error) => console.log("Gagal mengambil data:", error))
//       .finally(() => setLoading(false));
//   };

//   const fetchPeserta = () => {
//     axios
//       .get("http://localhost:3000/api/Peserta")
//       .then((res) => setPesertas(res.data))
//       .catch((err) => console.log(err));
//   };

//   const fetchBidang = () => {
//     axios
//       .get("http://localhost:3000/api/Bidang")
//       .then((res) => setBidangs(res.data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchData();
//     fetchPeserta();
//     fetchBidang();
//   }, []);

//   const handleDelete = (id) => {
//     if (!window.confirm("Apakah kamu yakin akan menghapus data ini?")) return;
//     axios
//       .delete(`http://localhost:3000/api/Pelatihan/${id}`)
//       .then(() => fetchData())
//       .catch((error) => console.log("Gagal menghapus data:", error));
//   };

//   const handleEdit = (id) => navigate(`/edit-pelatihan/${id}`);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3000/api/Pelatihan", {
//         biaya: parseInt(biaya),
//         jangka_waktu,
//         nama_bidang,
//         id_peserta: id_peserta || null,
//         id_Bidang: id_Bidang || null,
//       })
//       .then(() => {
//         setBiaya("");
//         setJangka_waktu("");
//         setNama_bidang("");
//         setPeserta("");
//         setId_Bidang("");
//         fetchData();
//       })
//       .catch((error) => console.error("Gagal menambahkan data:", error))
//       .finally(() => {
//         const modalEl = document.getElementById("exampleModal");
//         const modalInstance = Modal.getOrCreateInstance(modalEl);
//         modalInstance.hide();
//         document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
//       });
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <div className="spinner-border text-primary" role="status"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="container mt-4 bidang-container">
//         <div className="card">
//           <h1 className="card-header text-white fw-bold fs-4 bidang-header">
//             Data Pelatihan
//           </h1>
//           <div className="card-body">
//             <button
//               className="btn btn-primary mb-3"
//               data-bs-toggle="modal"
//               data-bs-target="#exampleModal"
//             >
//               Tambah Data
//             </button>

//             <table className="table table-striped table-hover">
//               <thead className="table-dark">
//                 <tr>
//                   <th>No</th>
//                   <th>Biaya</th>
//                   <th>Jangka Waktu</th>
//                   <th>Nama Bidang</th>
//                   <th>Bidang Terkait</th>
//                   {/* <th>Peserta</th> */}
//                   <th>Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pelatihans.map((pelatihan, index) => (
//                   <tr key={pelatihan.id}>
//                     <td>{index + 1}</td>
//                     <td>{pelatihan.biaya}</td>
//                     <td>{new Date(pelatihan.jangka_waktu).toLocaleDateString()}</td>
//                     <td>{pelatihan.nama_bidang}</td>
//                     <td>{pelatihan.bidang?.nama_bidang || "-"}</td>
//                     {/* <td>{pelatihan.peserta?.nama_peserta || "-"}</td> */}
//                     <td>
//                       <button
//                         className="btn btn-warning btn-sm me-2"
//                         onClick={() => handleEdit(pelatihan.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(pelatihan.id)}
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Modal Tambah Data */}
//       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form onSubmit={handleSubmit}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Tambah Data Pelatihan</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//               </div>
//               <div className="modal-body">
//                 <div className="form-floating mb-3">
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="biaya"
//                     placeholder="Biaya"
//                     value={biaya}
//                     onChange={(e) => setBiaya(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="biaya">Biaya</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="jangka_waktu"
//                     value={jangka_waktu}
//                     onChange={(e) => setJangka_waktu(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="jangka_waktu">Jangka Waktu</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="nama_bidang"
//                     placeholder="Nama Bidang"
//                     value={nama_bidang}
//                     onChange={(e) => setNama_bidang(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="nama_bidang">Nama Bidang</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <select
//                     className="form-select"
//                     id="id_peserta"
//                     value={id_peserta}
//                     onChange={(e) => setPeserta(e.target.value)}
//                   >
//                     <option value="">Pilih Peserta (opsional)</option>
//                     {pesertas.map((p) => (
//                       <option key={p.id} value={p.id}>
//                         {p.id} - {p.nama_peserta}
//                       </option>
//                     ))}
//                   </select>
//                   <label htmlFor="id_peserta">Peserta</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <select
//                     className="form-select"
//                     id="id_Bidang"
//                     value={id_Bidang}
//                     onChange={(e) => setId_Bidang(e.target.value)}
//                   >
//                     <option value="">Pilih Bidang (opsional)</option>
//                     {bidangs.map((b) => (
//                       <option key={b.id} value={b.id}>
//                         {b.id} - {b.nama_bidang}
//                       </option>
//                     ))}
//                   </select>
//                   <label htmlFor="id_Bidang">Bidang</label>
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
//     </>
//   );
// }
