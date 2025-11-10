import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import "../cssnya/bidang.css";

export default function Bidang() {
  const [bidangs, setBidangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nama_bidang, setNama_bidang] = useState("");
  const [selectedBidang, setSelectedBidang] = useState(null);
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
    const confirmDelete = window.confirm(
      "Apakah kamu yakin akan menghapus data ini?"
    );
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
        if (error.response && error.response.status === 409) {
          alert(error.response.data.message); // munculin alert kalo nama bidang duplikat
        } else {
          alert("Nama bidang sudah ada.");
          console.error(error);
        }
      })
      .finally(() => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.hide();
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((bd) => bd.remove());
      });
  };

  const handleDetail = (bidang) => {
    setSelectedBidang(bidang);
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
          <h1 className="card-header text-white  fw-bold fs-4 bidang-header">
            Data Bidang
          </h1>
          <div className="card-body">
            <button
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Tambah Data
            </button>

            <table className="table table-striped table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>No</th>
                  <th>Nama Bidang</th>

                  {/* <th>Nama Peserta</th> */}
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bidangs.map((bidang, index) => (
                  <tr key={bidang.id}>
                    <td>{index + 1}</td>
                    <td>{bidang.nama_bidang}</td>

                    {/* <td>{bidang.peserta?.nama_peserta || "-"}</td> */}
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleDetail(bidang)}
                      >
                        Detail
                      </button>
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
                <h5 className="modal-title">Tambah Data Bidang</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
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

      {/* Modal Detail */}
      <div
        className="modal fade"
        id="detailModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {selectedBidang && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">
                    Detail Bidang: {selectedBidang.nama_bidang}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <h6 className="fw-bold mb-3">Daftar Pelatihan:</h6>
                  {selectedBidang.pelatihan &&
                  selectedBidang.pelatihan.length > 0 ? (
                    <ul className="list-group">
                      {selectedBidang.pelatihan.map((p) => (
                        <li key={p.id} className="list-group-item">
                          <strong>{p.nama_pelatihan}</strong>
                          {p.peserta && p.peserta.length > 0 ? (
                            <ul className="mt-2">
                              {p.peserta.map((s) => (
                                <li key={s.id} className="text-secondary">
                                  {s.nama_peserta}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted ms-3">
                              Tidak ada peserta.
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">
                      Tidak ada pelatihan untuk bidang ini.
                    </p>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Tutup
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
