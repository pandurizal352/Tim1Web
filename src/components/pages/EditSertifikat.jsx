import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSertifikasi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelatihanList, setPelatihanList] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [idPelatihan, setIdPelatihan] = useState("");
  const [filePdf, setFilePdf] = useState(null);
  const [namaDokumenLama, setNamaDokumenLama] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Ambil data sertifikasi dan daftar pelatihan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/sertifikasi/${id}`);
        const data = res.data;
        setTanggal(data.tanggal_dan_bulan.split("T")[0]);
        setIdPelatihan(data.id_pelatihan);
        setNamaDokumenLama(data.nama_dokumen);
      } catch (err) {
        console.error(err);
        alert("Gagal ambil data sertifikasi");
      } finally {
        setLoading(false);
      }
    };

    const fetchPelatihan = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/pelatihan");
        setPelatihanList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    fetchPelatihan();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("tanggal_dan_bulan", tanggal);
      formData.append("id_pelatihan", idPelatihan);
      if (filePdf) formData.append("file_pdf", filePdf); // opsional

      await axios.put(`http://localhost:3000/api/sertifikasi/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Data berhasil diupdate");
      navigate("/sertifikasi");
    } catch (err) {
      console.error(err);
      alert("Gagal update data");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Sertifikasi</h2>
      <form onSubmit={handleUpdate}>
        {/* Tanggal */}
        <div className="mb-3">
          <label htmlFor="tanggal" className="form-label">Tanggal</label>
          <input
            type="date"
            id="tanggal"
            className="form-control text-black"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
        </div>

        {/* Pelatihan */}
        <div className="mb-3">
          <label htmlFor="pelatihan" className="form-label">Pelatihan</label>
          <select
            id="pelatihan"
            className="form-select text-black"
            value={idPelatihan}
            onChange={(e) => setIdPelatihan(e.target.value)}
            required
          >
            <option value="">Pilih Pelatihan</option>
            {pelatihanList.map((p) => (
              <option key={p.id} value={p.id}>{p.nama_pelatihan}</option>
            ))}
          </select>
        </div>

        {/* Upload File PDF */}
        <div className="mb-3">
          <label htmlFor="file_pdf" className="form-label">Upload File PDF Baru (Opsional)</label>
          <input
            type="file"
            accept="application/pdf"
            id="file_pdf"
            className="form-control text-black"
            onChange={(e) => setFilePdf(e.target.files[0])}
          />
          {namaDokumenLama && !filePdf && (
            <small className="text-muted">File lama: {namaDokumenLama}</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary col-12" disabled={submitting}>
          {submitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
