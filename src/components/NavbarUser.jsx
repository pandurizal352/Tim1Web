import { Link } from "react-router-dom";
import "../Global.css";
import geomandiri from "../images/geomandiri.png";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavbarUser() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek status login dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("posisi");
    setIsLoggedIn(false);
    navigate("/login");
  };


  return (
    <nav className="navbar navbar-expand-lg d-grid gap-0 row-gap-3 mb-3 pb-3 fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={geomandiri} alt="Bootstrap" width="200" height="50" />
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
            <Link
              className="nav-link navText ps-5 pe-3"
              aria-current="page"
              to="/"
            >
              Beranda
            </Link>
            {/* <Link className="nav-link navText ps-5 pe-3" to="/bidang">
              Bidang
            </Link> */}
            <Link
              className="nav-link navText ps-5 pe-3"
              aria-current="page"
              to="/pesertaUser"
            >
              Peserta
            </Link>
            <Link className="nav-link navText ps-5 pe-3" to="/tentang-kami">
              Tentang  kami
            </Link>
            {/* <Link className="nav-link navText ps-5 pe-3" to="/daftar">
              Daftar
            </Link> */}
           
          </div>

           {/* Login / Logout */}
          <div className="ms-auto d-flex align-items-center gap-3">
            {!isLoggedIn ? (
              <Link
                className="nav-link navText ms-auto position-absolute top-0 end-0 mt-3 me-3 pe-3"
                to="/login"
              >
                <FaUser className="me-1" /> Login
              </Link>

           
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
              >
                Logout
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
