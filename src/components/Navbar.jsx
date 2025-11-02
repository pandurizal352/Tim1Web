import {Link} from "react-router-dom"
export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/" >Beranda </Link>
        <Link className="nav-link" to="/bidang">Bidang </Link>
        <Link className="nav-link" to="/pelatihan" >Pelatihan </Link>
        <Link className="nav-link" to="/siswa" >Data Siswa </Link>
        <Link className="nav-link disabled" aria-disabled="true" >Disabled </Link>
      </div>
    </div>
  </div>
</nav>
    )
}