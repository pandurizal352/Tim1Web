import React, { useState } from 'react';
import './pages-css/smk3.css';

export default function SistemManajemenK3() {
  const [headerImage, setHeaderImage] = useState(null);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [carouselImages, setCarouselImages] = useState([null, null, null]);

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

  const handleCarouselImageUpload = (slideIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...carouselImages];
        newImages[slideIndex] = event.target.result;
        setCarouselImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const moveCarousel = (direction) => {
    setCarouselPosition((prev) => (prev + direction + 3) % 3);
  };

  const setCarouselPositionDirect = (position) => {
    setCarouselPosition(position);
  };

  const training = {
    title: "Auditor SMK3",
    price: "Rp. 7.500.000",
    duration: "5 Hari",
    description: "Auditor SMK3 adalah tenaga profesional bersertifikat yang bertugas melakukan audit terhadap penerapan Sistem Manajemen K3 di perusahaan untuk memastikan sistem tersebut berjalan efektif, patuh terhadap peraturan, dan mendukung budaya keselamatan kerja berkelanjutan.",
    schedule: [
      { 
        months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], 
        dates: ["20 - 24", "10 - 14", "10 - 14", "14 - 18", "19 - 23", "16 - 20"] 
      },
      { 
        months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], 
        dates: ["07 - 11", "04 - 08", "08 - 12", "06 - 10", "03 - 07", "08 - 12"] 
      }
    ],
    introduction: "PP No. 50 Tahun 2012 merupakan pelaksanaan Pasal 87 UU No. 13 Tahun 2003 tentang Ketenagakerjaan. PP ini mewajibkan setiap perusahaan yang mempekerjakan ≥100 tenaga kerja atau memiliki potensi kecelakaan tinggi untuk menerapkan SMK3 secara efektif. SMK3 adalah bagian dari sistem manajemen perusahaan yang bertujuan mengendalikan risiko kerja, meningkatkan perlindungan tenaga kerja, dan memastikan keselamatan kerja yang terencana, terukur, terstruktur, dan terintegrasi. Agar sistem ini berjalan baik, perlu dilakukan audit internal SMK3 secara periodik untuk menilai efektivitas penerapan K3 dan memberikan dasar bagi perbaikan berkelanjutan (continuous improvement).",
    objectives: [
      "Memahami dan memenuhi ketentuan PP No. 50 Tahun 2012",
      "Menjadi auditor internal SMK3 yang kompeten dan profesional",
      "Memahami prinsip, elemen, dan kriteria SMK3",
      "Mampu merencanakan, melaksanakan, dan melaporkan hasil audit SMK3",
      "Mengetahui tugas, fungsi, wewenang, dan jenjang karier auditor SMK3",
      "Memahami instrumen, teknik, dan laporan audit SMK3",
      "Berpotensi menjadi auditor eksternal SMK3"
    ],
    materials: [
      "Kebijakan Pengawas K3",
      "Kebijakan dan Prinsip Dasar SMK3",
      "Tugas, Fungsi, Wewenang & Kewajiban Auditor SMK3",
      "Jenjang Karier dan Badan Audit SMK3",
      "Mekanisme, Metode, dan Teknik Audit SMK3",
      "Instrumen dan Laporan Audit SMK3",
      "Rencana Tahunan Audit (RTA)",
      "Hubungan fungsional antara Auditor SMK3, Pengawas Ketenagakerjaan, dan Ahli K3"
    ],
    targetParticipants: [
      "Calon Auditor Internal SMK3",
      "Tim SMK3, HSE Department, HRD, dan personel yang berperan dalam penerapan K3 perusahaan",
      "Management Representative dan staf yang ditugaskan dalam kegiatan audit SMK3"
    ],
    methods: [
      "Video pembelajaran online (self learning)",
      "Telekonferensi via Zoom",
      "Diskusi & studi kasus (berdasarkan kondisi organisasi peserta)",
      "Presentasi kelompok",
      "Kuis & evaluasi akhir"
    ],
    facilities: [
      "Sertifikat Kemnaker RI",
      "E-Certificate Attendance (PJK3 Geo Mandiri Kreasi)",
      "E-Modul & E-Video Learning K3",
      "Link Zoom, Classroom, & WA Group"
    ],
    requirements: [
      "Sudah mengikuti Pembinaan Ahli K3 Umum (AK3U)",
      "Pendidikan minimal D3",
      "Sehat jasmani & rohani (dibuktikan surat dokter)",
      "Laptop/PC berkamera + aplikasi Zoom",
      "Aplikasi Timestamp & Google Classroom di HP",
      "Email Gmail aktif + internet stabil",
      "Berpakaian rapi selama pelatihan online"
    ],
    documents: [
      "Scan Sertifikat AK3U (beserta SKP & Kartu Kewenangan)",
      "Scan Ijazah terakhir (min. D3)",
      "Scan KTP",
      "Surat keterangan bekerja",
      "Surat keterangan sehat",
      "Foto berwarna (latar merah)",
      "Pakta integritas bermaterai"
    ],
    certification: "Peserta akan memperoleh Sertifikat dari Kemnaker RI (tanpa SKP). SKP hanya untuk peserta dari Lembaga Audit SMK3 dan diurus mandiri ke Kemnaker RI.",
    instructor: "Staf Ahli Kemnaker RI dan Instruktur bersertifikat IRCA Register di bidang Quality, Environment & Safety Management System Lead Auditor.",
    payment: "Pembayaran maksimal 3 hari sebelum pelatihan"
  };

  return (
    <div className="smk3-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">BIDANG SISTEM MANAJEMEN K3 (SMK3)</h1>
            <p className="hero-subtitle">
              Program Pelatihan Auditor SMK3 Profesional dan Tersertifikasi
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
            Bidang Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3) adalah bidang penerapan K3 yang berfokus pada pengelolaan secara sistematis, terencana, dan terintegrasi antara kebijakan, prosedur, serta kegiatan keselamatan dan kesehatan kerja dalam seluruh aspek operasional perusahaan.
          </p>
        </div>
      </section>

      {/* Training Detail */}
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
                  transform: `translateX(-${carouselPosition * 100}%)`,
                  transition: 'transform 0.5s ease'
                }}
              >
                {[0, 1, 2].map((slideIdx) => (
                  <div 
                    key={slideIdx}
                    className={`carousel-slide ${carouselImages[slideIdx] ? 'has-image' : ''}`}
                    onClick={() => document.getElementById(`carousel-${slideIdx}`).click()}
                  >
                    {carouselImages[slideIdx] ? (
                      <img 
                        src={carouselImages[slideIdx]} 
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
                      id={`carousel-${slideIdx}`}
                      accept="image/*" 
                      onChange={(e) => handleCarouselImageUpload(slideIdx, e)}
                      style={{ display: 'none' }}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button 
                className="carousel-control carousel-control-prev"
                onClick={() => moveCarousel(-1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                className="carousel-control carousel-control-next"
                onClick={() => moveCarousel(1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>

              {/* Carousel Dots */}
              <div className="carousel-indicators">
                {[0, 1, 2].map((dotIdx) => (
                  <span 
                    key={dotIdx}
                    className={`carousel-indicator ${carouselPosition === dotIdx ? 'active' : ''}`}
                    onClick={() => setCarouselPositionDirect(dotIdx)}
                  />
                ))}
              </div>
            </div>

            {/* Training Content */}
            <div className="training-card-body">
              <p className="training-description">{training.description}</p>

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

              {/* Introduction Box */}
              <div className="info-box">
                <h6 className="info-box-title">
                  <i className="bi bi-book-fill"></i> Pendahuluan
                </h6>
                <p className="info-box-text">{training.introduction}</p>
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
                  <i className="bi bi-journal-text"></i> Materi Pembinaan
                </h5>
                <ul className="training-list">
                  {training.materials.map((material, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Participants */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-people-fill"></i> Target Peserta
                </h5>
                <ul className="training-list">
                  {training.targetParticipants.map((target, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Methods */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-mortarboard-fill"></i> Metode Pembinaan
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

              {/* Payment Info */}
              <div className="info-box">
                <h6 className="info-box-title">
                  <i className="bi bi-credit-card-fill"></i> Biaya & Pembayaran
                </h6>
                <p className="info-box-text">
                  <strong>{training.price}</strong> / peserta (belum termasuk pajak)<br/>
                  {training.payment}
                </p>
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

              {/* Documents */}
              <div className="training-section">
                <h5 className="training-section-title">
                  <i className="bi bi-file-earmark-text"></i> Dokumen yang Dilampirkan
                </h5>
                <ul className="training-list">
                  {training.documents.map((doc, i) => (
                    <li key={i} className="training-list-item">
                      <i className="bi bi-check-circle-fill list-icon"></i>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certification */}
              <div className="certification-box">
                <h6 className="certification-title">
                  <i className="bi bi-award-fill"></i> Sertifikasi
                </h6>
                <p className="certification-text">{training.certification}</p>
              </div>

              {/* Instructor */}
              <div className="info-box">
                <h6 className="info-box-title">
                  <i className="bi bi-person-badge-fill"></i> Instruktur
                </h6>
                <p className="info-box-text">{training.instructor}</p>
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
            </div>
            <div className="contact-card">
              <i className="bi bi-building contact-icon"></i>
              <h4 className="contact-name">Office</h4>
              <p className="contact-detail">
                <i className="bi bi-telephone"></i> 021-8621510 / 021-86608657 Ext. 203
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