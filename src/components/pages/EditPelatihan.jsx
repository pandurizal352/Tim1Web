import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPelatihan() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [bidangs, setBidangs] = useState([]);
  const [biaya, setBiaya] = useState("");
  const [jangka_waktu, setJangka_waktu] = useState("");
  const [nama_pelatihan, setNama_pelatihan] = useState("");
  const [id_Bidang, setId_Bidang] = useState("");

  const navigate = useNavigate();

  //   const handleUpdate = ()=>{
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/Pelatihan/${id}`, {
        nama_pelatihan: nama_pelatihan,
        biaya: parseInt(biaya),
        jangka_waktu: jangka_waktu,
        id_bidang: id_Bidang || null,
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
        navigate("/pelatihan");
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchBidang = () => {
    axios
      .get("http://localhost:3000/api/Bidang")
      .then((res) => setBidangs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // alert ('hallo')
    fetchDataByid();
    fetchBidang();
  }, []);

  const fetchDataByid = () => {
    axios
      .get(`http://localhost:3000/api/Pelatihan/${id}`)
      .then((response) => {
        // setStudents(response.data);
        // console.log(response.data);
        const myData = response.data;
        setNama_pelatihan(myData["nama_pelatihan"]);
        setBiaya(myData["biaya"]);
        setJangka_waktu(myData["jangka_waktu"]);
        setId_Bidang(myData["bidang"]?.id || myData["id_bidang"] || "");
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
                  placeholder="nama pelatihan"
                  value={nama_pelatihan}
                  onChange={(e) => setNama_pelatihan(e.target.value)}
                ></input>
                <label htmlFor="floatingNama">Nama pelatihan</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control text-black"
                  id="floatingBiaya"
                  placeholder="Biaya"
                  value={biaya}
                  onChange={(e) => setBiaya(e.target.value)}
                ></input>
                <label htmlFor="floatingBiaya">Biaya</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control text-black"
                  id="floatingJangkaWaktu"
                  placeholder="Jangka Waktu"
                  value={jangka_waktu}
                  onChange={(e) => setJangka_waktu(e.target.value)}
                ></input>
                <label htmlFor="floatingJangkaWaktu">Jangka Waktu</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select text-black"
                  id="floatingBidang"
                  placeholder="Bidang Terkait"
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
                <label htmlFor="floatingBidang">Bidang Terkait</label>
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
