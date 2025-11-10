import { Link, useNavigate } from "react-router-dom";
import logoteam1 from "../images/logoteam1.jpeg";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("posisi");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
  <img
    src= {logoteam1} 
    alt="Logo"
    width="40"
    height="40"
    className="me-2 rounded-circle"
    
  />
  <p style={{color: "#F9F3EF", alignItems: "center"}}>Admin Panel</p>
</a>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/admin" style={{color: "#F9F3EF"}}>
              Beranda
            </Link>
            <Link className="nav-link" to="/bidang" style={{color: "#F9F3EF"}}>
              Bidang
            </Link>
            <Link className="nav-link" to="/pelatihan" style={{color: "#F9F3EF"}}>
              Pelatihan
            </Link>
            <Link className="nav-link" to="/sertifikat" style={{color: "#F9F3EF"}}>
              Sertifikat
            </Link>
             <Link className="nav-link" to="/peserta" style={{color: "#F9F3EF"}}>
              Data Peserta
            </Link>
             <Link className="nav-link" to="/pivot" style={{color: "#F9F3EF"}}>
              Pivot
            </Link>
              <Link className="nav-link" to="/DataUser" style={{color: "#F9F3EF"}}>
              Data User
            </Link>
            {/* Link ke halaman user */}
            <Link className="nav-link" to="/" style={{color: "#F9F3EF"}}>
              Halaman User
            </Link>
          </div>

          {/* Tombol logout di kanan */}
          <div className="ms-auto">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
