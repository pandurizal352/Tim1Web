import { useEffect, useState } from "react";
import "../cssnya/Beranda.css"; 
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export default function Beranda() {

     const [userCount, setUserCount] = useState(0);
  const [pesertaCount, setPesertaCount] = useState(0);
  const [bidangCount, setBidangCount] = useState(0);
  const [pelatihanCount, setPelatihanCount] = useState(0);
  const [sertifikatCount, setSertifikatCount] = useState(0);
  const [pesertaSertifCount, setPesertaSertifCount] = useState(0);
  const [nama, setNama] = useState("");

 
  const fetchDataUser = () => {
    axios
      .get("http://localhost:3000/api/user")
      .then((res) => setUserCount(res.data.length))
      .catch((err) => console.log(err));
  };

  const fetchDataPeserta = () => {
    axios
      .get("http://localhost:3000/api/peserta")
      .then((res) => setPesertaCount(res.data.length))
      .catch((err) => console.log(err));
  };

  const fetchDataBidang = () => {
    axios
      .get("http://localhost:3000/api/bidang")
      .then((res) => setBidangCount(res.data.length))
      .catch((err) => console.log(err));
  };

  const fetchDataPelatihan = () => {
    axios
      .get("http://localhost:3000/api/pelatihan")
      .then((res) => setPelatihanCount(res.data.length))
      .catch((err) => console.log(err));
  };

  const fetchDataSertifikasi = () => {
    axios
      .get("http://localhost:3000/api/sertifikasi")
      .then((res) => setSertifikatCount(res.data.length))
      .catch((err) => console.log(err));
  };

  const fetchDataPesertaSertif = () => {
    axios
      .get("http://localhost:3000/api/pesertasertif")
      .then((res) => setPesertaSertifCount(res.data.length))
      .catch((err) => console.log(err));
  };

 
  useEffect(() => {
    fetchDataUser();
    fetchDataPeserta();
    fetchDataBidang();
    fetchDataPelatihan();
    fetchDataSertifikasi();
    fetchDataPesertaSertif();

    // ambil token dan decode nama_institusi
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // pastikan backend mengirimkan nama_institusi dalam payload token
        setNama(decoded.nama_institusi || "Admin");
      } catch (error) {
        console.error("Gagal decode token:", error);
      }
    }
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-bold text-center"> Welcome Admin {nama && `(${nama})`}</h1>

      <div className="row g-4">
        {/* Card User */}
        <div className="col-md-4 col-sm-6">
          <div className="card text-white shadow card-1">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">{userCount}</h2>
              <p className="card-text">User</p>
            </div>
          </div>
        </div>

        {/* Card Peserta */}
        <div className="col-md-4 col-sm-6">
          <div className="card text-white shadow card-2">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">{pesertaCount}</h2>
              <p className="card-text">Peserta</p>
            </div>
          </div>
        </div>

        {/* Card Bidang */}
        <div className="col-md-4 col-sm-6">
          <div className="card text-white shadow card-1">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">{bidangCount}</h2>
              <p className="card-text">Bidang</p>
            </div>
          </div>
        </div>

        {/* Card Pelatihan */}
        <div className="col-md-4 col-sm-6">
          <div className="card text-white shadow card-2">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">{pelatihanCount}</h2>
              <p className="card-text">Pelatihan</p>
            </div>
          </div>
        </div>

        {/* Card Sertifikat */}
        <div className="col-md-4 col-sm-6">
          <div className="card text-white shadow card-1">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">{sertifikatCount}</h2>
              <p className="card-text">Sertifikat</p>
            </div>
          </div>
        </div>

        {/* Card Peserta yang sudah punya sertifikat */}
        <div className="col-md-4 col-sm-6">
          <div className="card text-white shadow card-2">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">{pesertaSertifCount}</h2>
              <p className="card-text">
                Peserta yang sudah mempunyai sertifikat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
