import React from "react";
import "../components/cssnya/footer.css";
import LogoGroup from "../images/LogoGroup.png";

const Footer = () => {
  return (
    <footer className="footer text-white py-5 px-4 position-relative">
      <div className="container position-relative">
        <div className="row gy-4">
          {/* Tentang Kami */}
          <div className="col-md-4">
            <h2 className="fw-bold mb-3 border-bottom border-light pb-2">Tentang Kami</h2>
            <p className="small text-light">
              GEO MANDIRI GROUP Management Consultant, Training Centre & Event Organizer
              yang memberikan layanan pembinaan dan perizinan konsultan secara profesional.
              Kami berkomitmen pada integritas, mutu, dan kepuasan klien.
            </p>
            <div className="d-flex align-items-center gap-3 mt-3">
              <img
                src= {LogoGroup}
                alt="G20"
                className="footer-logo"
              />
              <img
                src={LogoGroup}
                alt="K3"
                className="footer-logo"
              />
            </div>
          </div>

          {/* Sosial Media */}
          <div className="col-md-4">
            <h2 className="fw-bold mb-3 border-bottom border-light pb-2">Sosial Media</h2>
            <ul className="list-unstyled small">
              <li className="mb-2">
                📸 <a href="https://www.instagram.com/geomandirigroupcreative1?igsh=MWY5cGkzNGNmZnV5" className="link-light text-decoration-underline"> @geomandirigroup</a>
              </li>
              <li>
                🎵 <a href="https://www.tiktok.com/@geomandirigroupcreative1?_r=1&_t=ZS-91204Swi80q" className="link-light text-decoration-underline"> @geogroupcreative</a>
              </li>
            </ul>
          </div>

          {/* Alamat */}
          <div className="col-md-4">
            <h2 className="fw-bold mb-3 border-bottom border-light pb-2">Alamat</h2>
            <p className="small mb-2">
              📍 JL. Raya Jatiwaringin, Rukan Kaca Hijau No. 6-C, Pangkalan Jati,
              Cipinang Melayu, Jakarta Timur, DKI Jakarta 13620
            </p>
            <p className="small mb-1">📞 (021) 8661-8812</p>
            <p className="small mb-3">
              ✉️ <a href="mailto:geomandiriteam1@gmail.com" className="link-light text-decoration-underline">geomandiriteam1@gmail.com</a>
            </p>
            <div className="ratio ratio-16x9 rounded overflow-hidden shadow border border-light">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.277992545448!2d106.88428227455562!3d-6.224604293771875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3c56d9d2a9f%3A0xa1a7489a3244a88!2sGeo%20Mandiri%20Kreasi%20PT!5e0!3m2!1sen!2sid!4v1730289700000!5m2!1sen!2sid"
                title="Geo Mandiri Group Location"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <hr className="border-light my-4" />
        <p className="text-center small text-light mb-0">
          © 2025 Geo Mandiri Group — Created with 💙 by Boost Performance
        </p>
      </div>
    </footer>
  );
};

export default Footer;
