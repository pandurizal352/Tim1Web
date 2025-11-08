import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPesertaSertifikat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [id_peserta, setIdPeserta] = useState("");
  const [id_sertifikat, setIdSertifikat] = useState("");
  const [pesertas, setPesertas] = useState([]);
  const [sertifikats, setSertifikats] = useState([]);

  useEffect(() => {
    fetchDataById();
    fetchPeserta();
    fetchSertifikat();
  }, []);

  // 🔹 Ambil data berdasarkan id PesertaSertifikat
  const fetchDataById = () => {
    axios
      .get(`http://localhost:3000/api/pesertasertif/${id}`)
      .then((res) => {
        const data = res.data;
        setIdPeserta(data.id_peserta);
        setIdSertifikat(data.id_sertifikat || "");
      })
      .catch((err) => console.error(err));
  };

  // 🔹 Ambil semua Peserta
  const fetchPeserta = () => {
    axios
      .get("http://localhost:3000/api/peserta")
      .then((res) => setPesertas(res.data))
      .catch((err) => console.error(err));
  };

  // 🔹 Ambil semua Sertifikat (beserta pelatihannya)
  const fetchSertifikat = () => {
    axios
      .get("http://localhost:3000/api/sertifikasi")
      .then((res) => setSertifikats(res.data))
      .catch((err) => console.error(err));
  };

  // 🔹 Update data PesertaSertifikat
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/api/pesertasertif/${id}`, {
        id_peserta,
        id_sertifikat,
      })
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/pivot");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data:", error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="card p-3">
        <h3 className="text-center mb-3">Edit Peserta Sertifikat</h3>

        <form onSubmit={handleUpdate}>
          {/* Pilih Peserta */}
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

          {/* Pilih Sertifikat */}
          <div className="form-floating mb-3">
            <select
              className="form-select"
              value={id_sertifikat}
              onChange={(e) => setIdSertifikat(e.target.value)}
            >
              <option value="">Pilih Sertifikat</option>
              {sertifikats.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nama_dokumen} — {s.pelatihan?.nama_pelatihan || "Tanpa Pelatihan"}
                </option>
              ))}
            </select>
            <label>Pilih Sertifikat</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
