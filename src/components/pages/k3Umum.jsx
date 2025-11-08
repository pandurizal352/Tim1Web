import React, { useState } from 'react';
import '../cssnya/K3Umum.css';

export default function K3Umum() {
  const [headerImage, setHeaderImage] = useState(null);
  const [carouselPositions, setCarouselPositions] = useState([0]);
  const [carouselImages, setCarouselImages] = useState([
    [null, null, null, null, null]
  ]);

  const handleHeaderImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHeaderImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarouselImageUpload = (carouselIndex, slideIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...carouselImages];
        newImages[carouselIndex][slideIndex] = event.target.result;
        setCarouselImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const moveCarousel = (carouselIndex, direction) => {
    setCarouselPositions(prev => {
      const newPositions = [...prev];
      newPositions[carouselIndex] = (newPositions[carouselIndex] + direction + 5) % 5;
      return newPositions;
    });
  };

  const setCarouselPosition = (carouselIndex, position) => {
    setCarouselPositions(prev => {
      const newPositions = [...prev];
      newPositions[carouselIndex] = position;
      return newPositions;
    });
  };

  const training = {
    title: "Ahli K3 Umum",
    price: "Rp. 8.000.000",
    duration: "12 Hari",
    description: "Pelatihan Ahli K3 Umum adalah program sertifikasi resmi dari Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI) yang dirancang untuk menyiapkan tenaga profesional dalam bidang keselamatan dan kesehatan kerja. Peserta akan mempelajari dasar hukum K3, analisis risiko, pengendalian bahaya, hingga audit dan pelaporan kecelakaan kerja. Program ini menggabungkan teori dan praktik lapangan untuk memastikan peserta mampu mengimplementasikan K3 secara nyata di tempat kerja.",
    schedule: [
      { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], dates: ["13 - 25", "10 - 22", "10 - 22", "21 - 05", "21 - 05", "09 - 23"] },
      { months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], dates: ["14 - 26", "18 - 30", "15 - 27", "13 - 25", "10 - 22", "01 - 13"] }
    ],
    objectives: [
      "Menjelaskan tugas, wewenang, dan tanggung jawab Ahli K3",
      "Menjelaskan hak pekerja dan manfaat penerapan K3",
      "Menjelaskan pentingnya SMK3 bagi perusahaan",
      "Menganalisis kasus kecelakaan dan menyusun laporan K3",
      "Memahami sistem pelaporan, pengawasan, dan audit K3",
      "Mengenal P2K3 serta standar K3 nasional dan internasional"
    ],
    materials: [
      "Kebijakan K3 Nasional dan UU No.1 Tahun 1970",
      "Prinsip Dasar K3 dan P2K3",
      "Pengawasan K3 (Listrik, Pesawat Uap, Bejana Tekan, Konstruksi, Kimia Berbahaya, dll.)",
      "Manajemen Risiko, Audit SMK3, dan Analisis Kecelakaan",
      "Kunjungan Lapangan, Pembuatan Laporan, dan Ujian Teori via Kemnaker RI"
    ],
    participants: [
      "Praktisi K3, Supervisor, Anggota P2K3",
      "Profesional dari berbagai sektor (manufaktur, jasa, konstruksi, rumah sakit, transportasi)"
    ],
    requirements: [
      "Pendidikan minimal D3/S1 dan pengalaman kerja 2 tahun",
      "Sehat jasmani dan rohani",
      "Memiliki laptop/PC dengan Zoom, Google Classroom, Time Stamp",
      "Koneksi internet stabil"
    ],
    methods: [
      "Video materi dan belajar mandiri online",
      "Telekonferensi via Zoom bersama narasumber",
      "Diskusi kasus, kuis, dan evaluasi akhir"
    ],
    facilities: [
      "Sertifikat, SKP, dan Kartu Kewenangan dari Kemnaker RI",
      "E-Certificate, E-Modul, E-Video Learning",
      "Emblem Ahli K3",
      "Akses Zoom, Classroom, dan WA Group",
      "Instruktur dari Kemnaker RI dan praktisi profesional"
    ]
  };

  return (
    <div className="k3-umum-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">BIDANG KEAHLIAN K3 UMUM</h1>
            <p className="hero-subtitle">
              Program Sertifikasi Resmi Kementerian Ketenagakerjaan RI
            </p>
          </div>
        </div>
        <div 
          className="header-image-upload"
          onClick={() => document.getElementById('headerImageInput').click()}
        >
          {headerImage ? (
            <img src={headerImage} alt="Header" className="header-upload-image" />
          ) : (
            <div className="upload-placeholder">
              <i className="bi bi-camera upload-icon"></i>
              <p className="upload-text">Klik untuk menambahkan gambar header</p>
            </div>
          )}
          <input 
            type="file" 
            id="headerImageInput" 
            accept="image/*" 
            onChange={handleHeaderImageUpload}
            style={{ display: 'none' }}
          />
        </div>
        <div className="hero-fade"></div>
      </section>

      {/* Introduction */}
      <section className="section-intro">
        <div className="container">
          <p className="text-paragraph">
            Bidang K3 Umum berfokus pada upaya menciptakan lingkungan kerja yang aman, sehat, dan produktif. Keahlian ini mencakup kemampuan untuk mengidentifikasi potensi bahaya di tempat kerja, menerapkan sistem pencegahan kecelakaan, serta memastikan kepatuhan terhadap peraturan keselamatan kerja nasional maupun internasional.
          </p>
          <p className="text-paragraph" style={{ marginTop: '20px' }}>
            Seorang Ahli K3 Umum berperan penting dalam menjaga keselamatan tenaga kerja dan aset perusahaan melalui penerapan sistem manajemen K3 (SMK3), edukasi pekerja, audit keselamatan, serta investigasi kecelakaan kerja. Bidang ini sangat relevan di berbagai sektor industri seperti manufaktur, konstruksi, pertambangan, transportasi, rumah sakit, hingga perhotelan.
          </p>
        </div>
      </section>

      {/* Training Section */}
      <section className="section-training-detail">
        <div className="container">
          <div className="training-card-wrapper">
            {/* Training Header */}
            <div className="training-card-header">
              <h3 className="training-card-title">{training.title}</h3>
              <div className="training-badge-group">
                <span className="training-badge">
                  <i className="bi bi-tag-fill"></i> {training.price}
                </span>
                <span className="training-badge">
                  <i className="bi bi-calendar-check"></i> {training.duration}
                </span>
              </div>
            </div>

            {/* Carousel */}
            <div className="training-carousel">
              <div 
                className="carousel-track" 
                style={{ 
                  transform: `translateX(-${carouselPositions[0] * 100}%)`,
                  transition: 'transform 0.5s ease'
                }}
              >
                {[0, 1, 2, 3, 4].map((slideIdx) => (
                  <div 
                    key={slideIdx}
                    className={`carousel-slide ${carouselImages[0][slideIdx] ? 'has-image' : ''}`}
                    onClick={() => document.getElementById(`carousel-0-${slideIdx}`).click()}
                  >
                    {carouselImages[0][slideIdx] ? (
                      <img 
                        src={carouselImages[0][slideIdx]} 
                        alt={`Slide ${slideIdx + 1}`} 
                        className="carousel-slide-image"
                      />
                    ) : (
                      <div className="carousel-slide-placeholder">
                        <i className="bi bi-image carousel-placeholder-icon"></i>
                        <p>Klik untuk menambahkan gambar {slideIdx + 1}</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      id={`carousel-0-${slideIdx}`}
                      accept="image/*" 
                      onChange={(e) => handleCarouselImageUpload(0, slideIdx, e)}
                      style={{ display: 'none' }}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button 
                className="carousel-control carousel-control-prev"
                onClick={() => moveCarousel(0, -1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                className="carousel-control carousel-control-next"
                onClick={() => moveCarousel(0, 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>

              {/* Carousel Dots */}
              <div className="carousel-indicators">
                {[0, 1, 2, 3, 4].map((dotIdx) => (
                  <span 
                    key={dotIdx}
                    className={`carousel-indicator ${carouselPositions[0] === dotIdx ? 'active' : ''}`}
                    onClick={() => setCarouselPosition(0, dotIdx)}
                  />
                ))}
              </div>
            </div>

            {/* Training Content */}
            <div className="training-card-body">
              <p className="training-description">{training.description}</p>

              {/* Pendahuluan */}
              <div className="info-box">
                <h5 className="info-box-title">
                  <i className="bi bi-info-circle-fill"></i> Pendahuluan
                </h5>
                <p className="info-box-text">
                  Program ini dilaksanakan berdasarkan UU No. 1 Tahun 1970 dan peraturan turunannya yang mewajibkan perusahaan memiliki Ahli K3 untuk menjamin keselamatan kerja. Pelatihan dirancang agar peserta memahami sistem manajemen keselamatan dan kesehatan kerja (SMK3) serta mampu menerapkannya di lingkungan kerja sesuai pedoman Kemnaker RI.
                </p>
              </div>

              {/* Schedule */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-calendar-event"></i> Jadwal Pelatihan
                </h5>
                <div className="schedule-table-wrapper">
                  <table className="schedule-table">
                    <thead>
                      <tr>
                        {training.schedule[0].months.map((month, i) => (
                          <th key={i}>{month}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {training.schedule[0].dates.map((date, i) => (
                          <td key={i}>{date}</td>
                        ))}
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        {training.schedule[1].months.map((month, i) => (
                          <th key={i}>{month}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {training.schedule[1].dates.map((date, i) => (
                          <td key={i}>{date}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Objectives */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-bullseye"></i> Tujuan Pelatihan
                </h5>
                <ul className="training-list">
                  {training.objectives.map((obj, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-book-fill"></i> Materi Pembinaan
                </h5>
                <ul className="training-list">
                  {training.materials.map((mat, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Participants */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-people-fill"></i> Peserta yang Dapat Mengikuti
                </h5>
                <ul className="training-list">
                  {training.participants.map((part, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{part}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-clipboard-check"></i> Persyaratan Peserta
                </h5>
                <ul className="training-list">
                  {training.requirements.map((req, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Methods */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-laptop"></i> Metode Pembelajaran
                </h5>
                <ul className="training-list">
                  {training.methods.map((method, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Facilities */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-gift-fill"></i> Fasilitas
                </h5>
                <ul className="training-list">
                  {training.facilities.map((facility, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-contact">
        <div className="container">
          <div className="section-header-white">
            <h2 className="section-title-white">Informasi Kontak</h2>
            <p className="section-subtitle-white">Hubungi kami untuk informasi lebih lanjut</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <i className="bi bi-person-circle contact-icon"></i>
              <h4 className="contact-name">Adina Restuningsih</h4>
              <p className="contact-detail">
                <i className="bi bi-phone"></i> 0813-6810-2031
              </p>
              <p className="contact-detail">
                <i className="bi bi-envelope"></i> adinarestuanturi@yahoo.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2025 PT. Geo Mandiri Kreasi. All Rights Reserved.</p>
      </footer>
    </div>
  );
}