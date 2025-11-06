import { Link, useNavigate } from "react-router-dom";

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
        <a className="navbar-brand fw-bold" href="#">
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
            <Link className="nav-link" to="/peserta">
              Data Peserta
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
