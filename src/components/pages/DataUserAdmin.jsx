import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import "../cssnya/bidang.css";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_institusi: "",
    email_perusahaan: "",
    telpn_perusahaan: "",
    password: "",
    alamat: "",
    posisi: "",
    status_pembayaran: "",
    bukti_pembayaran: null,
  });
  const [selectedUser, setSelectedUser] = useState(null);

  // Ambil data user
  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/user")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Gagal ambil data:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bukti_pembayaran") {
      setFormData({ ...formData, bukti_pembayaran: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Tambah user
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post("http://localhost:3000/api/user/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setFormData({
          nama_institusi: "",
          email_perusahaan: "",
          telpn_perusahaan: "",
          password: "",
          alamat: "",
          posisi: "",
          status_pembayaran: "",
          bukti_pembayaran: null,
        });
        fetchData();
      })
      .catch((err) => console.error("Gagal menambahkan data:", err))
      .finally(() => {
        const modalEl = document.getElementById("tambahModal");
        const modal = Modal.getOrCreateInstance(modalEl);
        modal.hide();
        document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
      });
  };

  // Edit user
  const handleEdit = (user) => {
    setSelectedUser(user);
    const modal = new Modal(document.getElementById("editModal"));
    modal.show();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(selectedUser).forEach((key) => {
      if (selectedUser[key] !== null) data.append(key, selectedUser[key]);
    });

    axios
      .put(`http://localhost:3000/api/user/${selectedUser.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => fetchData())
      .catch((err) => console.error("Gagal update:", err))
      .finally(() => {
        const modal = Modal.getOrCreateInstance(document.getElementById("editModal"));
        modal.hide();
        document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
      });
  };

  // Hapus user
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      axios
        .delete(`http://localhost:3000/api/user/${id}`)
        .then(() => fetchData())
        .catch((err) => console.error("Gagal hapus:", err));
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-primary">Data User Perusahaan</h2>
      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#tambahModal"
      >
        Tambah User
      </button>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama Institusi</th>
            <th>Email</th>
            {/* <th>Telepon</th>
            <th>Alamat</th> */}
            <th>Posisi</th>
            <th>Status Pembayaran</th>
            <th>Bukti Pembayaran</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td>{i + 1}</td>
              <td>{u.nama_institusi}</td>
              <td>{u.email_perusahaan}</td>
              {/* <td>{u.telpn_perusahaan}</td>
              <td>{u.alamat}</td> */}
              <td>{u.posisi}</td>
              <td>{u.status_pembayaran || "-"}</td>
              <td>
                {u.bukti_pembayaran ? (
                        <a
                        href={`http://localhost:3000/uploads/bukti_pembayaran/${u.bukti_pembayaran}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                  <img
                    src={`http://localhost:3000/uploads/bukti_pembayaran/${u.bukti_pembayaran}`}
                    alt="Bukti"
                    width="70"
                    className="rounded"
                  />
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                 <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit-datauser/${u.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(u.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{/* Modal Tambah */}
<div className="modal fade" id="tambahModal" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="modal-header">
          <h5 className="modal-title">Tambah User</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div className="modal-body">
          {[
            ["nama_institusi", "Nama Institusi", "text"],
            ["email_perusahaan", "Email", "email"],
            ["telpn_perusahaan", "Telepon", "number"],
            ["password", "Password", "password"],
            ["alamat", "Alamat", "text"],
          ].map(([key, label, type]) => (
            <div className="form-floating mb-3" key={key}>
              <input
                type={type}
                className="form-control text-black"
                placeholder={label}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
              <label>{label}</label>
            </div>
          ))}

          {/* Dropdown Posisi */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Posisi</label>
            <select
              className="form-select text-black"
              name="posisi"
              value={formData.posisi}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Posisi --</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Dropdown Status Pembayaran */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Status Pembayaran</label>
            <select
              className="form-select text-black"
              name="status_pembayaran"
              value={formData.status_pembayaran}
              onChange={handleChange}
            >
              <option value="">-- Pilih Status --</option>
              <option value="lunas">Lunas</option>
              <option value="belum lunas">Belum Lunas</option>
            </select>
          </div>

          {/* Input Bukti Pembayaran */}
          <div className="mb-3">
  <label htmlFor="bukti_pembayaran_tambah" className="form-label fw-semibold">
    Bukti Pembayaran (Foto)
  </label>
  <input
    type="file"
    id="bukti_pembayaran_tambah"
    name="bukti_pembayaran"
    className="form-control text-black"
    onChange={handleChange}  
    accept="image/*"
    required
  />
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

{/* Modal Edit */}

{/* <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      {selectedUser && (
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            {[
              ["nama_institusi", "Nama Institusi", "text"],
              ["email_perusahaan", "Email", "email"],
              ["telpn_perusahaan", "Telepon", "number"],
              ["alamat", "Alamat", "text"],
            ].map(([key, label, type]) => (
              <div className="form-floating mb-3" key={key}>
                <input
                  type={type}
                  className="form-control text-black"
                  placeholder={label}
                  value={selectedUser[key] || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, [key]: e.target.value })
                  }
                />
                <label>{label}</label>
              </div>
            ))}

            
            <div className="mb-3">
              <label className="form-label fw-semibold">Posisi</label>
              <select
                className="form-select text-black"
                value={selectedUser.posisi || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, posisi: e.target.value })
                }
              >
                <option value="">-- Pilih Posisi --</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

           
            <div className="mb-3">
              <label className="form-label fw-semibold">Status Pembayaran</label>
              <select
                className="form-select text-black"
                value={selectedUser.status_pembayaran || ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    status_pembayaran: e.target.value,
                  })
                }
              >
                <option value="">-- Pilih Status --</option>
                <option value="Lunas">Lunas</option>
                <option value="belum_lunas">Belum Lunas</option>
              </select>
            </div>

           
         <div className="mb-3">
  <label htmlFor="bukti_pembayaran" className="form-label fw-semibold">
    Bukti Pembayaran (Foto)
  </label>
  <input
    type="file"
    id="bukti_pembayaran"
    name="bukti_pembayaran"
    className="form-control text-black"
    onChange={(e) =>
      setSelectedUser({
        ...selectedUser,
        bukti_pembayaran: e.target.files[0],
      })
    }
    accept="image/*"
    required
  />
</div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Tutup
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
</div> */

}

    </div>
  );
}
