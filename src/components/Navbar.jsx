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
  Admin Panel
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
            <Link className="nav-link" to="/admin">
              Beranda
            </Link>
            <Link className="nav-link" to="/bidang">
              Bidang
            </Link>
            <Link className="nav-link" to="/pelatihan">
              Pelatihan
            </Link>
            <Link className="nav-link" to="/sertifikat">
              Sertifikat
            </Link>
             <Link className="nav-link" to="/peserta">
              Data Peserta
            </Link>
             <Link className="nav-link" to="/pivot">
              pivot
            </Link>
              <Link className="nav-link" to="/DataUser">
              Data User
            </Link>
            {/* Link ke halaman user */}
            <Link className="nav-link" to="/">
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
