import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import "../cssnya/bidang.css";

export default function Peserta() {
  const [paraPeserta, setParaPeserta] = useState([]);
  const [pelatihans, setPelatihans] = useState([]);
  const [filteredPelatihans, setFilteredPelatihans] = useState([]);
  const [bidangs, setBidangs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPeserta, setSelectedPeserta] = useState(null);

  const [loading, setLoading] = useState(true);

  const [nama_peserta, setNama_peserta] = useState("");
  const [email_peserta, setEmail_peserta] = useState("");
  const [telpn_peserta, setTelpn_peserta] = useState("");
  const [alamat_peserta, setAlamat_peserta] = useState("");
  const [id_Bidang, setId_Bidang] = useState("");
  const [id_Pelatihan, setId_Pelatihan] = useState("");
  const [id_User, setId_User] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/Peserta");
      setParaPeserta(res.data);
    } catch (err) {
      console.error("Gagal mengambil data peserta:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPelatihan = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/Pelatihan");
      setPelatihans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBidang = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/Bidang");
      setBidangs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/User");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPelatihan();
    fetchBidang();
    fetchUser();
  }, []);

  // ⬇️ Filter pelatihan berdasarkan bidang yang dipilih
  useEffect(() => {
    if (id_Bidang) {
      const filtered = pelatihans.filter(
        (p) => p.id_bidang === parseInt(id_Bidang)
      );
      setFilteredPelatihans(filtered);
    } else {
      setFilteredPelatihans([]);
    }
    setId_Pelatihan(""); // reset pelatihan jika bidang berubah
  }, [id_Bidang, pelatihans]);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah kamu yakin akan menghapus data ini?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/Peserta/${id}`);
      fetchData();
    } catch (error) {
      console.log("Gagal menghapus data:", error);
    }
  };

  const handleEdit = (id) => navigate(`/edit-peserta/${id}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/Peserta", {
        nama_peserta,
        email_peserta,
        telpn_peserta,
        alamat_peserta,
        id_user: id_User || null,
        id_pelatihan: id_Pelatihan || null,
      })
      .then(() => {
        setNama_peserta("");
        setEmail_peserta("");
        setTelpn_peserta("");
        setAlamat_peserta("");
        setId_Pelatihan("");
        setId_User("");
        setId_Bidang("");
        fetchData();
        alert("data berhasil di tambah");
      })

      .catch((error) => console.error("Gagal menambahkan data:", error))
      .finally(() => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.hide();
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((bd) => bd.remove());
      });
  };

  const handleDetail = (peserta) => {
    setSelectedPeserta(peserta);
    const modalEl = document.getElementById("ModalDetail");
    const modalInstance = Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const handleKonfirmasi = async (id) => {
  if (!window.confirm("Yakin ingin konfirmasi pembayaran peserta ini?")) return;

  try {
    const response = await fetch(`http://localhost:3000/api/peserta/konfirmasi/${id}`, {
      method: "PUT",
    });

    if (!response.ok) throw new Error("Gagal konfirmasi pembayaran");

    alert("Pembayaran berhasil dikonfirmasi!");

    // tutup modal
    const modalEl = document.getElementById("ModalDetail");
    const modalInstance = Modal.getOrCreateInstance(modalEl);
    modalInstance.hide();

    fetchData(); // refresh data peserta
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat konfirmasi pembayaran");
  }
};



  return (
    <>
      <div className="container mt-4 bidang-container">
        <div className="card">
          <h1 className="card-header text-white fw-bold fs-4 bidang-header">
            Data Peserta
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
                  <th>Nama Peserta</th>
                  <th>Nama Instansi</th>
                  <th>Status Pembayaran</th>
                  {/* <th>Bukti Pembayaran</th> */}
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paraPeserta.map((peserta, index) => (
                  <tr key={peserta.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{peserta.nama_peserta}</td>
                    <td>{peserta.user?.nama_institusi || "-"}</td>
                    <td>{peserta.status_pembayaran || "-"}</td>
                    {/* <td>
                      {peserta.bukti_pembayaran ? (
                        <a
                          href={`http://localhost:3000/uploads/bukti_pembayaran/${peserta.bukti_pembayaran}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={`http://localhost:3000/uploads/bukti_pembayaran/${peserta.bukti_pembayaran}`}
                            alt="Bukti"
                            width="70"
                            className="rounded"
                          />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td> */}
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleDetail(peserta)} // kirim seluruh objek peserta, bukan hanya id
                      >
                        Detail
                      </button>
                      {/* <button
                        className="btn btn-primary btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalDetail"
                        onClick={() => handleDetail(peserta.id)}
                      >
                        Detail
                      </button> */}
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(peserta.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(peserta.id)}
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
                <h5 className="modal-title">Tambah Data Peserta</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                {/* Nama Peserta */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control text-black"
                    id="nama_peserta"
                    placeholder="Nama Peserta"
                    value={nama_peserta}
                    onChange={(e) => setNama_peserta(e.target.value)}
                    required
                  />
                  <label htmlFor="nama_peserta">Nama Peserta</label>
                </div>

                {/* Instansi */}
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="id_User"
                    value={id_User}
                    onChange={(e) => setId_User(e.target.value)}
                  >
                    <option value="">Instansi</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nama_institusi}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="id_User">Instansi</label>
                </div>

                {/* Email */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control text-black"
                    id="email_peserta"
                    placeholder="Email"
                    value={email_peserta}
                    onChange={(e) => setEmail_peserta(e.target.value)}
                    required
                  />
                  <label htmlFor="email_peserta">Email</label>
                </div>

                {/* Telepon */}
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control text-black"
                    id="telpn_peserta"
                    value={telpn_peserta}
                    onChange={(e) => setTelpn_peserta(e.target.value)}
                    required
                  />
                  <label htmlFor="telpn_peserta">Telepon</label>
                </div>

                {/* Alamat */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control text-black"
                    id="alamat_peserta"
                    placeholder="Alamat Peserta"
                    value={alamat_peserta}
                    onChange={(e) => setAlamat_peserta(e.target.value)}
                    required
                  />
                  <label htmlFor="alamat_peserta">Alamat</label>
                </div>

                {/* Bidang */}
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="id_Bidang"
                    value={id_Bidang}
                    onChange={(e) => setId_Bidang(e.target.value)}
                  >
                    <option value="">Pilih Bidang</option>
                    {bidangs.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nama_bidang}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="id_Bidang">Bidang</label>
                </div>

                {/* Pelatihan */}
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="id_Pelatihan"
                    value={id_Pelatihan}
                    onChange={(e) => setId_Pelatihan(e.target.value)}
                    disabled={!id_Bidang}
                  >
                    <option value="">
                      {id_Bidang
                        ? "Pilih Pelatihan"
                        : "Pilih bidang terlebih dahulu"}
                    </option>
                    {filteredPelatihans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama_pelatihan}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="id_Pelatihan">Pelatihan</label>
                </div>
              </div>

              {/* Input Bukti Pembayaran */}
              <div className="mb-3">
                <label
                  htmlFor="bukti_pembayaran_tambah"
                  className="form-label fw-semibold"
                >
                  Bukti Pembayaran (Foto)
                </label>
                <input
                  type="file"
                  id="bukti_pembayaran_tambah"
                  name="bukti_pembayaran"
                  className="form-control text-black"
                  onChange={handleSubmit}
                  accept="image/*"
                  required
                />
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

      {/* Modal detail data peserta */}
      <div
        className="modal fade"
        id="ModalDetail"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Detail Data Peserta
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {selectedPeserta ? (
                <div>
                  <p>
                    <strong>Nama:</strong> {selectedPeserta.nama_peserta}
                  </p>
                  <p>
                    <strong>Instansi:</strong>{" "}
                    {selectedPeserta.user?.nama_institusi || "-"}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedPeserta.email_peserta}
                  </p>
                  <p>
                    <strong>Telepon:</strong> {selectedPeserta.telpn_peserta}
                  </p>
                  <p>
                    <strong>Alamat:</strong> {selectedPeserta.alamat_peserta}
                  </p>
                  <p>
                    <strong>Pelatihan:</strong>{" "}
                    {selectedPeserta.pelatihan?.nama_pelatihan || "-"}
                  </p>
                  <p>
                    <strong>Status Pembayaran:</strong>{" "}
                    {selectedPeserta.status_pembayaran || "-"}
                  </p>
                  <p>
                    <strong>Bukti Pembayaran:</strong>
                    <br />
                    {selectedPeserta.bukti_pembayaran ? (
                      <a
                        href={`http://localhost:3000/uploads/bukti_pembayaran/${selectedPeserta.bukti_pembayaran}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`http://localhost:3000/uploads/bukti_pembayaran/${selectedPeserta.bukti_pembayaran}`}
                          alt="Bukti Pembayaran"
                          width="120"
                          className="rounded mt-2"
                        />
                      </a>
                    ) : (
                      <span>Tidak ada bukti pembayaran</span>
                    )}
                  </p>
                </div>
              ) : (
                <p>Memuat data...</p>
              )}

            </div>

            <div className="modal-footer">
              <button
                  className="btn btn-success"
                  onClick={() => handleKonfirmasi(selectedPeserta.id)}
                  // disabled={selectedPeserta.user?.status_pembayaran === "sudah dibayar"}
                >
                  Konfirmasi Pembayaran
                </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
            </div>
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

// export default function Peserta() {
//   const [paraPeserta, setparaPeserta] = useState([]);
//   const [pelatihans, setPelatihans] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedPeserta, setSelectedPeserta] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [nama_peserta, setNama_peserta] = useState("");
//   const [email_peserta, setEmail_peserta] = useState("");
//   const [telpn_peserta, setTelpn_peserta] = useState("");
//   const [alamat_peserta, setAlamat_peserta] = useState("");
//   const [id_Pelatihan, setId_Pelatihan] = useState("");
//   const [id_User, setId_User] = useState("");

//   const navigate = useNavigate();

//   const fetchData = () => {
//     axios
//       .get("http://localhost:3000/api/Peserta")
//       .then((response) => setparaPeserta(response.data))
//       .catch((error) => console.log("Gagal mengambil data:", error))
//       .finally(() => setLoading(false));
//   };

//   const fetchPelatihan = () => {
//     axios
//       .get("http://localhost:3000/api/Pelatihan")
//       .then((res) => setPelatihans(res.data))
//       .catch((err) => console.log(err));
//   };

//   const fetchUser = () => {
//     axios
//       .get("http://localhost:3000/api/User")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchData();
//     fetchPelatihan();
//     fetchUser();
//   }, []);

//   const handleDelete = (id) => {
//     if (!window.confirm("Apakah kamu yakin akan menghapus data ini?")) return;
//     axios
//       .delete(`http://localhost:3000/api/Peserta/${id}`)
//       .then(() => fetchData())
//       .catch((error) => console.log("Gagal menghapus data:", error));
//   };

//   const handleEdit = (id) => navigate(`/edit-peserta/${id}`);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3000/api/Peserta", {
//         nama_peserta,
//         email_peserta,
//         telpn_peserta,
//         alamat_peserta,
//         id_user: id_User || null,
//         id_pelatihan: id_Pelatihan || null,
//       })
//       .then(() => {
//         setNama_peserta("");
//         setEmail_peserta("");
//         setTelpn_peserta("");
//         setAlamat_peserta("");
//         setId_Pelatihan("");
//         setId_User("");
//         fetchData();
//       })
//       .catch((error) => console.error("Gagal menambahkan data:", error))
//       .finally(() => {
//         const modalEl = document.getElementById("exampleModal");
//         const modalInstance = Modal.getOrCreateInstance(modalEl);
//         modalInstance.hide();
//         document
//           .querySelectorAll(".modal-backdrop")
//           .forEach((bd) => bd.remove());
//       });
//   };

//   const handleDetail = (peserta) => {
//   setSelectedPeserta(peserta);
//   const modalEl = document.getElementById("ModalDetail");
//   const modalInstance = Modal.getOrCreateInstance(modalEl);
//   modalInstance.show();
// };

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
//             Data Peserta
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
//               <thead className="table-dark text-center">
//                 <tr>
//                   <th className="pe-5">No</th>
//                   <th className="">Nama Peserta</th>
//                   <th className="">Nama Instansi</th>
//                   <th className="">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paraPeserta.map((peserta, index) => (
//                   <tr key={peserta.id} className="text-center">
//                     <td className="pe-5">{index + 1}</td>
//                     <td className="">{peserta.nama_peserta}</td>
//                     <td className="">{peserta.user?.nama_institusi || "-"}</td>
//                     <td className="">
//                       <button
//                         className="btn btn-primary btn-sm me-2"
//                         data-bs-toggle="modal"
//                         data-bs-target="#ModalDetail"
//                         onClick={() => handleDetail(peserta.id)}
//                       >
//                         Detail
//                       </button>
//                       <button
//                         className="btn btn-warning btn-sm me-2"
//                         onClick={() => handleEdit(peserta.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(peserta.id)}
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
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form onSubmit={handleSubmit}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Tambah Data Peserta</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control text-black"
//                     id="nama_peserta"
//                     placeholder="Nama Peserta"
//                     value={nama_peserta}
//                     onChange={(e) => setNama_peserta(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="nama_peserta">Nama Peserta</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <select
//                     className="form-select"
//                     id="id_User"
//                     value={id_User}
//                     onChange={(e) => setId_User(e.target.value)}
//                   >
//                     <option value="">Instansi</option>
//                     {users.map((p) => (
//                       <option key={p.id} value={p.id}>
//                         {p.id} - {p.nama_institusi}
//                       </option>
//                     ))}
//                   </select>
//                   <label htmlFor="id_Pelatihan">Instansi</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <input
//                     type="email"
//                     className="form-control text-black"
//                     id="email_peserta"
//                     placeholder="Email"
//                     value={email_peserta}
//                     onChange={(e) => setEmail_peserta(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="email_peserta">Email</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <input
//                     type="number"
//                     className="form-control text-black"
//                     id="telpn_peserta"
//                     value={telpn_peserta}
//                     onChange={(e) => setTelpn_peserta(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="telpn_peserta">Telepon</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control text-black"
//                     id="alamat_peserta"
//                     placeholder="Alamat Peserta"
//                     value={alamat_peserta}
//                     onChange={(e) => setAlamat_peserta(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="nama_peserta">Alamat</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <select
//                     className="form-select"
//                     id="id_Pelatihan"
//                     value={id_Pelatihan}
//                     onChange={(e) => setId_Pelatihan(e.target.value)}
//                   >
//                     <option value="">Pilih Pelatihan (opsional)</option>
//                     {pelatihans.map((p) => (
//                       <option key={p.id} value={p.id}>
//                         {p.id} - {p.nama_pelatihan}
//                       </option>
//                     ))}
//                   </select>
//                   <label htmlFor="id_Pelatihan">Pelatihan</label>
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
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

//       {/* Modal detail data peserta */}
//       <div
//         className="modal fade"
//         id="ModalDetail"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">
//                 Detail Data Peserta
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               {paraPeserta.map((p, i) => (
//                 <div key={p.id}>
//                   Nama : {p.nama_peserta} <br />
//                   Instansi : {p.user?.nama_institusi || "-"} <br />
//                   Email : {p.email_peserta} <br />
//                   Telepon : {p.telpn_peserta} <br />
//                   Alamat : {p.alamat_peserta} <br />
//                   Pelatihan : {p.pelatihan?.nama_pelatihan || "-"}
//                 </div>
//               ))}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Tutup
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
