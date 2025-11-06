import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import "../cssnya/bidang.css";

export default function Bidang() {
  const [bidangs, setBidangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nama_bidang, setNama_bidang] = useState("");
  // const [daftar_pelatihan, setDaftar_pelatihan] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/bidang")
      .then((response) => {
        setBidangs(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log("Gagal mengambil data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin akan menghapus data ini?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/api/bidang/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log("Gagal menghapus data:", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-bidang/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/bidang", {
        nama_bidang,
        // daftar_pelatihan,
      })
      .then(() => {
        setNama_bidang("");
        // setDaftar_pelatihan("");
        fetchData();
      })
      .catch((error) => {
        console.error("Gagal menambahkan data:", error);
      })
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
          <h1 className="card-header text-white fw-bold fs-4 bidang-header">Data Bidang</h1>
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
                  <th>Nama Bidang</th>
                  {/* <th>Daftar Pelatihan</th> */}
                  {/* <th>Nama Peserta</th> */}
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bidangs.map((bidang, index) => (
                  <tr key={bidang.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{bidang.nama_bidang}</td>
                    {/* <td>{bidang.daftar_pelatihan || "-"}</td> */}
                    {/* <td>{bidang.peserta?.nama_peserta || "-"}</td> */}
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(bidang.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(bidang.id)}
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
                <h5 className="modal-title">Tambah Data Bidang</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control text-black"
                    id="nama_bidang"
                    placeholder="Nama Bidang"
                    value={nama_bidang}
                    onChange={(e) => setNama_bidang(e.target.value)}
                    required
                  />
                  <label htmlFor="nama_bidang">Nama Bidang</label>
                </div>
                {/* <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control text-black"
                    id="daftar_pelatihan"
                    placeholder="Daftar Pelatihan"
                    value={daftar_pelatihan}
                    onChange={(e) => setDaftar_pelatihan(e.target.value)}
                  />
                  <label htmlFor="daftar_pelatihan">Daftar Pelatihan</label>
                </div> */}
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
