import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((res) => setSelectedUser(res.data))
      .catch((err) => console.error("Gagal ambil data user:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(selectedUser).forEach((key) => {
      if (selectedUser[key] !== null) data.append(key, selectedUser[key]);
    });

    axios
      .put(`http://localhost:3000/api/user/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/DataUser");
      })
      .catch((err) => console.error("Gagal update:", err));
  };

  if (!selectedUser)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4 text-primary">Edit Data User</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
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
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/user")}
          >
            Kembali
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
