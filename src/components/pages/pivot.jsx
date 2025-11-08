import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import "../cssnya/bidang.css"; // ganti nama CSS jika kamu punya file khusus

export default function PesertaSertifikat() {
    const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id_peserta, setIdPeserta] = useState("");
  const [id_sertifikat, setIdSertifikat] = useState("");
  const [pesertas, setPesertas] = useState([]);
  const [sertifikats, setSertifikats] = useState([]);

  // Fetch semua data PesertaSertifikat
  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/pesertasertif")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("Gagal mengambil data:", err))
      .finally(() => setLoading(false));
  };

  // Ambil data Peserta dan Sertifikat untuk dropdown
  const fetchOptions = async () => {
    try {
      const [resPeserta, resSertifikat] = await Promise.all([
        axios.get("http://localhost:3000/api/peserta"),
        axios.get("http://localhost:3000/api/sertifikasi"),
      ]);
      setPesertas(resPeserta.data);
      setSertifikats(resSertifikat.data);
    } catch (error) {
      console.error("Gagal memuat data peserta/sertifikat:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/pesertasertif", {
        id_peserta,
        id_sertifikat,
      })
      .then(() => {
        fetchData();
        setIdPeserta("");
        setIdSertifikat("");
      })
      .catch((err) => console.error("Gagal menambahkan data:", err))
      .finally(() => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.hide();
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((bd) => bd.remove());
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-pivot/${id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus data ini?")) return;

    axios
      .delete(`http://localhost:3000/api/pesertasertif/${id}`)
      .then(() => fetchData())
      .catch((err) => console.error("Gagal menghapus data:", err));
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <div className="container mt-4 bidang-container">
      <div className="card">
        <h1 className="card-header text-white fw-bold fs-4 bidang-header">
          Data Peserta Sertifikat
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
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Nama Peserta</th>
                <th>Email</th>
                <th>Nama Sertifikat</th>
                <th>Tanggal Sertifikat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.peserta?.nama_peserta || "-"}</td>
                  <td>{item.peserta?.email_peserta || "-"}</td>
                  {/* <td>{item.sertifikat?.nama_dokumen || "-"}</td> */}
                  <td>
                    {item.sertifikat?.nama_dokumen ? (
                      <a
                        href={`http://localhost:3000/uploads/sertifikasi/${item.sertifikat.nama_dokumen}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none text-primary fw-semibold"
                      >
                        {item.sertifikat.nama_dokumen}
                      </a>
                    ) : (
                      <span className="text-muted">Belum ada sertifikat</span>
                    )}
                  </td>

                  <td>
                    {item.sertifikat?.tanggal_dan_bulan
                      ? new Date(
                          item.sertifikat.tanggal_dan_bulan
                        ).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
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
                <h5 className="modal-title">Tambah Peserta Sertifikat</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    value={id_peserta}
                    onChange={(e) => setIdPeserta(e.target.value)}
                    required
                  >
                    <option value="">Pilih Peserta</option>
                    {pesertas.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama_peserta}
                      </option>
                    ))}
                  </select>
                  <label>Pilih Peserta</label>
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    value={id_sertifikat}
                    onChange={(e) => setIdSertifikat(e.target.value)}
                  >
                    <option value="">Pilih Sertifikat</option>
                    {sertifikats.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nama_dokumen} —{" "}
                        {s.pelatihan?.nama_pelatihan || "Tanpa Pelatihan"}
                      </option>
                    ))}
                  </select>
                  <label>Pilih Sertifikat</label>
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
    </div>
  );
}
