import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPesertaAdmin() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [paraPeserta, setparaPeserta] = useState([]);
  const [pelatihans, setPelatihans] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPeserta, setSelectedPeserta] = useState(null);
  const [nama_peserta, setNama_peserta] = useState("");
  const [email_peserta, setEmail_peserta] = useState("");
  const [telpn_peserta, setTelpn_peserta] = useState("");
  const [alamat_peserta, setAlamat_peserta] = useState("");
  const [id_Pelatihan, setId_Pelatihan] = useState("");
  const [id_User, setId_User] = useState("");

  const navigate = useNavigate();

  //   const handleUpdate = ()=>{
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/Peserta/${id}`, {
        nama_peserta: nama_peserta,
        email_peserta: email_peserta,
        telpn_peserta: telpn_peserta,
        alamat_peserta: alamat_peserta,
        id_user: id_User || null,
        id_pelatihan: id_Pelatihan || null,
      })
      // .then((response) => {
      //   // setStudents(response.data);
      //   // console.log(response.data);
      //   console.log(response)
      //   var message = response.data.message
      //   if(message){
      //       alert('data berhasil di update')
      //       navigate("/bidang");
      //   }
      // })
      .then((response) => {
        alert("Data berhasil diupdate");
        navigate("/peserta");
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPelatihan = () => {
    axios
      .get("http://localhost:3000/api/Pelatihan")
      .then((res) => setPelatihans(res.data))
      .catch((err) => console.log(err));
  };

  const fetchUser = () => {
    axios
      .get("http://localhost:3000/api/User")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // alert ('hallo')
    fetchDataByid();
    fetchPelatihan();
    fetchUser();
  }, []);

  const fetchDataByid = () => {
    axios
      .get(`http://localhost:3000/api/Peserta/${id}`)
      .then((response) => {
        // setStudents(response.data);
        // console.log(response.data);
        const myData = response.data;
        setNama_peserta(myData["nama_peserta"]);
        setEmail_peserta(myData["email_peserta"]);
        setTelpn_peserta(myData["telpn_peserta"]);
        setAlamat_peserta(myData["alamat_peserta"]);
        setId_User(myData["user"]?.id || myData["id_user"] || "");
        setId_Pelatihan(myData["pelatihan"]?.id || myData["id_pelatihan"] || "");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <div className="card mt-2 p-3">
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              {/* floating label */}

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control text-black"
                  id="floatingNama"
                  placeholder="nama peserta"
                  value={nama_peserta}
                  onChange={(e) => setNama_peserta(e.target.value)}
                ></input>
                <label htmlFor="floatingNama">Nama Peserta</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control text-black"
                  id="floatingEmail"
                  placeholder="Email Peserta"
                  value={email_peserta}
                  onChange={(e) => setEmail_peserta(e.target.value)}
                ></input>
                <label htmlFor="floatingEmail">Email Peserta</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control text-black"
                  id="floatingTelepon"
                  placeholder="Telepon Peserta"
                  value={telpn_peserta}
                  onChange={(e) => setTelpn_peserta(e.target.value)}
                ></input>
                <label htmlFor="floatingTelepon">Telepon Peserta</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control text-black"
                  id="floatingAlamat"
                  placeholder="Alamat Peserta"
                  value={alamat_peserta}
                  onChange={(e) => setAlamat_peserta(e.target.value)}
                ></input>
                <label htmlFor="floatingAlamat">Alamat Peserta</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select text-black"
                  id="floatingUser"
                  placeholder="Nama Instansi"
                  value={id_User}
                  onChange={(e) => setId_User(e.target.value)}
                >
                  <option value="">Nama Instansi</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.id} - {u.nama_institusi}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingBidang">Nama Instansi</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select text-black"
                  id="floatingPelatihan"
                  placeholder="Nama Pelatihan"
                  value={id_Pelatihan}
                  onChange={(e) => setId_Pelatihan(e.target.value)}
                >
                  <option value="">Pilih Pelatihan</option>
                  {pelatihans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.nama_pelatihan}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingBidang">Nama Pelatihan</label>
              </div>

              <button type="submit" className="btn btn-primary col-12">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
