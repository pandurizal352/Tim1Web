import React from 'react';
import '../cssnya/tentangKami.css';

export default function TentangKami() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">PT. Geo Mandiri Kreasi</h1>
            <p className="hero-subtitle">
              Konsultan Manajemen, Pelatihan, dan Event Management Profesional
            </p>
          </div>
        </div>
        <div className="hero-fade"></div>
      </div>

      {/* Profil Perusahaan */}
      <section className="section-profile">
        <div className="container">
          <div className="profile-grid">
            <div>
              <h2 className="section-title">Tentang Kami</h2>
              <p className="text-paragraph">
                PT. Geo Mandiri Kreasi adalah perusahaan konsultan manajemen, pelatihan, dan event management yang terdiri dari para profesional berpengalaman di bidang perencanaan, studi, pengukuran, pengawasan, dan manajemen.
              </p>
              <p className="text-paragraph">
                Didirikan untuk berperan dalam pembangunan nasional, perusahaan ini menggabungkan keahlian lintas disiplin guna memberikan layanan konsultansi yang profesional, objektif, dan maksimal dalam menghadapi tantangan era Otonomi Daerah dan milenium ketiga.
              </p>
            </div>
            <div className="image-box profile-image">
              <i className="bi bi-shield-check icon-large"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="section-vision">
        <div className="container">
          <div className="vision-grid">
            <div className="image-box vision-image order-2-md">
              <i className="bi bi-bullseye icon-large"></i>
            </div>
            <div className="order-1-md">
              <h3 className="subsection-title">Visi</h3>
              <p className="text-paragraph-large">
                Menjadi Perusahaan Consultan yang terdepan dengan Kualitas Produk dan Pelayanan terbaik dibidangnya.
              </p>
            </div>
          </div>

          <div className="mission-grid">
            <div>
              <h3 className="subsection-title">Misi</h3>
              <ul className="mission-list">
                <li className="mission-item">
                  <i className="bi bi-check-circle-fill mission-icon"></i>
                  <span>Melayani Pelanggan dengan Kualitas Produk terbaik</span>
                </li>
                <li className="mission-item">
                  <i className="bi bi-check-circle-fill mission-icon"></i>
                  <span>Menjadikan Konsultan teratas dibidangnya</span>
                </li>
              </ul>
            </div>
            <div className="image-box mission-image">
              <i className="bi bi-check-circle icon-large-light"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Legalitas */}
      <section className="section-legality">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Legalitas</h2>
            <p className="section-subtitle">Terdaftar dan tersertifikasi resmi</p>
          </div>
          <div className="legality-grid">
            <div className="legality-card legality-card-dark">
              <div className="legality-icon-wrapper">
                <i className="bi bi-file-earmark-check legality-icon"></i>
              </div>
              <h4 className="legality-title">Badan Hukum</h4>
              <p className="legality-text">Pengesahan Badan Hukum Perseroan sesuai Akta Notaris Aidah, S.H Nomor 09, tanggal 22 Desember 2017</p>
            </div>
            <div className="legality-card legality-card-light">
              <div className="legality-icon-wrapper">
                <i className="bi bi-building legality-icon"></i>
              </div>
              <h4 className="legality-title">Daftar Perseroan</h4>
              <p className="legality-text">Nomor 09.04.1.70.27219, Tanggal 22 Desember 2017</p>
            </div>
            <div className="legality-card legality-card-dark">
              <div className="legality-icon-wrapper">
                <i className="bi bi-receipt legality-icon"></i>
              </div>
              <h4 className="legality-title">NPWP</h4>
              <p className="legality-text">Terdaftar di Direktorat Jenderal Pajak No. 02.182.762.1.005.000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pelatihan K3 */}
      <section className="section-training">
        <div className="container">
          <div className="section-header-white">
            <h2 className="section-title-white">Pelatihan K3</h2>
            <p className="section-subtitle-white">Bidang keahlian pelatihan Keselamatan dan Kesehatan Kerja</p>
          </div>
          
          <div className="training-grid">
            <div className="training-card">
              <div className="training-card-flex">
                <div className="training-image training-image-dark">
                  <i className="bi bi-shield-fill-check training-icon"></i>
                </div>
                <div className="training-content">
                  <h4 className="training-title">K3 Umum</h4>
                  <p className="training-text">Pelatihan dasar keselamatan dan kesehatan kerja untuk semua industri dengan materi komprehensif</p>
                </div>
              </div>
            </div>

            <div className="training-card">
              <div className="training-card-flex">
                <div className="training-image training-image-light">
                  <i className="bi bi-gear-fill training-icon"></i>
                </div>
                <div className="training-content">
                  <h4 className="training-title">Sistem Manajemen K3 (SMK3)</h4>
                  <p className="training-text">Implementasi dan pengelolaan sistem manajemen keselamatan dan kesehatan kerja</p>
                </div>
              </div>
            </div>

            <div className="training-card">
              <div className="training-card-flex">
                <div className="training-image training-image-dark">
                  <i className="bi bi-exclamation-triangle-fill training-icon"></i>
                </div>
                <div className="training-content">
                  <h4 className="training-title">Ergonomi, Lingkungan Kerja & Bahan Berbahaya</h4>
                  <p className="training-text">Pengelolaan ergonomi, lingkungan kerja yang aman, dan penanganan bahan berbahaya</p>
                </div>
              </div>
            </div>

            <div className="training-card">
              <div className="training-card-flex">
                <div className="training-image training-image-light">
                  <i className="bi bi-arrow-up-right training-icon"></i>
                </div>
                <div className="training-content">
                  <h4 className="training-title">Pekerjaan Pada Ketinggian</h4>
                  <p className="training-text">Keselamatan kerja di ketinggian dengan standar internasional dan praktek langsung</p>
                </div>
              </div>
            </div>

            <div className="training-card">
              <div className="training-card-flex">
                <div className="training-image training-image-dark">
                  <i className="bi bi-heart-pulse-fill training-icon"></i>
                </div>
                <div className="training-content">
                  <h4 className="training-title">Kesehatan Kerja</h4>
                  <p className="training-text">Program kesehatan kerja untuk menciptakan lingkungan kerja yang sehat dan produktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="section-advantages">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Keunggulan Kami</h2>
            <p className="section-subtitle">Mengapa memilih PT. Geo Mandiri Kreasi?</p>
          </div>

          <div className="advantages-wrapper">
            <div className="advantage-row">
              <div className="image-box advantage-image-dark">
                <i className="bi bi-people-fill icon-large"></i>
              </div>
              <div>
                <h4 className="advantage-title">Tim Profesional Berpengalaman</h4>
                <p className="advantage-text">Terdiri dari para profesional berpengalaman di bidang perencanaan, studi, pengukuran, pengawasan, dan manajemen</p>
              </div>
            </div>

            <div className="advantage-row">
              <div className="order-2-md">
                <h4 className="advantage-title">Layanan Konsultansi Profesional</h4>
                <p className="advantage-text">Memberikan layanan konsultansi yang profesional, objektif, dan maksimal dengan keahlian lintas disiplin</p>
              </div>
              <div className="image-box advantage-image-light order-1-md">
                <i className="bi bi-award-fill icon-large-light"></i>
              </div>
            </div>

            <div className="advantage-row">
              <div className="image-box advantage-image-dark">
                <i className="bi bi-graph-up-arrow icon-large"></i>
              </div>
              <div>
                <h4 className="advantage-title">Kualitas Terbaik</h4>
                <p className="advantage-text">Berkomitmen menjadi perusahaan konsultan terdepan dengan kualitas produk dan pelayanan terbaik</p>
              </div>
            </div>

            <div className="advantage-row">
              <div className="order-2-md">
                <h4 className="advantage-title">Legalitas Lengkap</h4>
                <p className="advantage-text">Terdaftar resmi dengan badan hukum yang sah dan memiliki NPWP dari Direktorat Jenderal Pajak</p>
              </div>
              <div className="image-box advantage-image-light order-1-md">
                <i className="bi bi-shield-check icon-large-light"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="section-cta">
        <div className="cta-container">
          <h2 className="cta-title">Siap Meningkatkan Kompetensi K3 Tim Anda?</h2>
          <p className="cta-text">Hubungi kami untuk informasi lebih lanjut tentang program pelatihan dan konsultansi</p>
          <button className="cta-button">
            Hubungi Kami Sekarang
          </button>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="footer">
        <p className="footer-text">© 2025 PT. Geo Mandiri Kreasi. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
}