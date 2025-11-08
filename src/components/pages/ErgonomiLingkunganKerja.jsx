import React, { useState } from 'react';
import './pages-css/ErgonomiLingkunganKerja.css';

export default function ErgonomiLingkunganKerja() {
  const [headerImage, setHeaderImage] = useState(null);
  const [carouselPositions, setCarouselPositions] = useState([0, 0, 0, 0, 0, 0]);
  const [carouselImages, setCarouselImages] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null]
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
      newPositions[carouselIndex] = (newPositions[carouselIndex] + direction + 3) % 3;
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

  const trainings = [
    {
      title: "Ahli K3 Kimia",
      price: "Rp. 12.000.000",
      duration: "12 Hari",
      description: "Ahli K3 Kimia adalah petugas K3 bersertifikat yang bertanggung jawab mengawasi, menganalisis, dan mengendalikan bahaya bahan kimia di tempat kerja untuk menjamin keselamatan pekerja dan lingkungan.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "Mei", "Juni"], dates: ["13 - 25", "10 - 22", "03 - 15", "05 - 19", "16 - 30"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November"], dates: ["07 - 19", "11 - 23", "08 - 20", "13 - 25", "03 - 15"] }
      ],
      objectives: [
        "Memahami peraturan perundangan K3 Kimia dan lingkungan",
        "Melakukan identifikasi, evaluasi, dan pengendalian bahaya bahan kimia berbahaya",
        "Mengetahui cara kerja aman dan penanggulangan kecelakaan industri kimia",
        "Melakukan pengukuran bahan lingkungan kerja serta pengendaliannya"
      ],
      requirements: [
        "Pendidikan minimal D3",
        "Pengalaman kerja minimal 2 tahun di perusahaan",
        "Memiliki Komputer/Laptop/PC berkamera dengan aplikasi Zoom",
        "Menginstal aplikasi Time Stamp dan Google Classroom"
      ],
      certification: "Sertifikat, Kartu Kewenangan, dan SKP Ahli K3 Kimia dari Kemnaker RI"
    },
    {
      title: "Petugas K3 Kimia",
      price: "Rp. 8.000.000",
      duration: "6 Hari",
      description: "Petugas K3 Kimia adalah tenaga bersertifikat yang bertugas memastikan penggunaan dan pengelolaan bahan kimia di tempat kerja berlangsung aman, mencegah kecelakaan, serta menjaga kesehatan pekerja dan lingkungan.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Juni"], dates: ["20 - 25", "17 - 22", "10 - 15", "28 - 05", "30 - 05"] },
        { months: ["Juli", "Agustus", "September", "November", "Desember"], dates: ["30 - 05", "25 - 30", "29 - 04", "24 - 29", "08 - 13"] }
      ],
      objectives: [
        "Memahami peraturan K3 Kimia dan lingkungan",
        "Mengidentifikasi bahaya bahan kimia",
        "Melakukan penilaian & pengendalian bahan kimia",
        "Menjalankan prosedur kerja aman",
        "Melaksanakan tanggap darurat dan penanggulangan kecelakaan bahan kimia"
      ],
      requirements: [
        "Pendidikan minimal SLTA/sederajat",
        "Sehat jasmani dan rohani",
        "Memiliki laptop/PC berkamera + aplikasi Zoom",
        "Berpakaian formal selama pelatihan"
      ],
      certification: "Sertifikat & Kartu Lisensi resmi dari Kemnaker RI"
    },
    {
      title: "Ahli K3 Muda Lingkungan Kerja",
      price: "Rp. 11.500.000",
      duration: "7 Hari",
      description: "Ahli K3 Muda Lingkungan Kerja adalah tenaga bersertifikat yang memiliki keahlian untuk mengukur, mengevaluasi, dan mengendalikan faktor-faktor lingkungan kerja agar tetap aman dan sehat bagi tenaga kerja.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Mei"], dates: ["22 - 31", "13 - 20", "13 - 20", "21 - 29", "14 - 21"] },
        { months: ["Juni", "Juli", "Agustus", "Oktober", "November"], dates: ["16 - 24", "21 - 29", "25 - 02", "20 - 28", "24 - 04"] }
      ],
      objectives: [
        "Peraturan perundangan K3",
        "Program Higiene Industri: antisipasi, rekognisi, evaluasi & pengendalian bahaya",
        "Pengenalan risiko kesehatan & promosi kesehatan kerja",
        "Teknik pengambilan sampel faktor fisika, kimia, biologi, ergonomi & psikologi",
        "Ventilasi industri"
      ],
      requirements: [
        "Pendidikan minimal D3/S1",
        "Pengalaman kerja minimal 2 tahun di bidang pengukuran/pengendalian lingkungan kerja",
        "Sehat jasmani & rohani (dibuktikan surat dokter)",
        "Vaksin dosis 2"
      ],
      certification: "Sertifikat Kompetensi dari BNSP, SKP & Kartu Lisensi dari Kemnaker RI"
    },
    {
      title: "Teknisi Ruang Terbatas",
      price: "Rp. 8.000.000",
      duration: "5 Hari",
      description: "Teknisi Ruang Terbatas adalah pekerja bersertifikat yang bertugas langsung di area ruang terbatas untuk menjalankan pekerjaan secara aman sesuai prosedur K3, di bawah pengawasan Petugas dan Ahli K3 Ruang Terbatas.",
      schedule: [
        { months: ["Januari", "Februari", "April", "Mei", "Juni"], dates: ["20 - 24", "24 - 28", "21 - 25", "19 - 23", "16 - 21"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November"], dates: ["21 - 25", "25 - 29", "22 - 26", "20 - 24", "24 - 28"] }
      ],
      objectives: [
        "Bekerja secara aman di ruang terbatas atau tertutup",
        "Melaksanakan prosedur kerja dan keselamatan",
        "Mencegah kecelakaan kerja dan penyakit akibat kerja (PAK)",
        "Memahami prosedur izin kerja (Work Permit System)",
        "Penggunaan Alat Pelindung Diri (APD) untuk confined space"
      ],
      requirements: [
        "Pendidikan minimal SLTA/sederajat",
        "Berbadan sehat (dibuktikan surat dokter)",
        "Pengalaman kerja minimal 2 tahun di industri yang memiliki ruang terbatas",
        "Memiliki laptop/PC berkamera dan aplikasi Zoom"
      ],
      certification: "Sertifikat dari Kemnaker RI"
    },
    {
      title: "Petugas K3 Penyelamat Ruang Terbatas",
      price: "Rp. 7.000.000",
      duration: "3 Hari",
      description: "Petugas K3 Penyelamat Ruang Terbatas adalah tenaga terlatih dan bersertifikat yang bertugas melakukan penyelamatan darurat dan evakuasi di ruang terbatas dengan mengutamakan keselamatan diri, korban, dan tim kerja sesuai standar K3.",
      schedule: [
        { months: ["Januari", "Februari", "April", "Mei", "Juni"], dates: ["22 - 24", "26 - 28", "23 - 25", "21 - 23", "18 - 20"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November"], dates: ["23 - 25", "27 - 29", "24 - 26", "22 - 24", "26 - 28"] }
      ],
      objectives: [
        "Bekerja secara aman di ruang terbatas (confined space)",
        "Melaksanakan prosedur kerja sesuai program K3 ruang terbatas",
        "Mencegah kecelakaan dan penyakit akibat kerja (PAK)",
        "Teknik penyelamatan di ruang terbatas",
        "Prosedur tanggap darurat dan P3K"
      ],
      requirements: [
        "Pendidikan minimal SLTA/sederajat",
        "Sehat jasmani dan rohani",
        "Pengalaman kerja minimal 2 tahun di industri yang memiliki ruang terbatas",
        "Memiliki laptop/PC berkamera dan aplikasi Zoom"
      ],
      certification: "Sertifikat dari Kemnaker RI"
    },
    {
      title: "Teknisi K3 Deteksi Gas",
      price: "Rp. 7.000.000",
      duration: "3 Hari",
      description: "Teknisi K3 Deteksi Gas adalah tenaga bersertifikat yang bertugas melakukan pengukuran dan pengendalian kadar gas di lingkungan kerja untuk memastikan kondisi udara aman, mencegah ledakan, keracunan, atau kekurangan oksigen sesuai standar K3.",
      schedule: [
        { months: ["Januari", "Februari", "April", "Mei", "Juni"], dates: ["22 - 24", "26 - 28", "23 - 25", "21 - 23", "18 - 20"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November"], dates: ["23 - 25", "27 - 29", "24 - 26", "22 - 24", "26 - 28"] }
      ],
      objectives: [
        "Memahami peraturan perundangan terkait ruang terbatas dan deteksi gas",
        "Mengetahui jenis-jenis gas berbahaya di tempat kerja",
        "Melakukan pengukuran dan pengujian gas berbahaya dengan benar",
        "Melakukan pengendalian terhadap gas berbahaya di lingkungan kerja"
      ],
      requirements: [
        "Pendidikan minimal SLTA/sederajat",
        "Sehat jasmani dan rohani (dibuktikan surat dokter)",
        "Pengalaman kerja minimal 2 tahun di industri yang memiliki ruang terbatas",
        "Memiliki komputer/laptop berkamera (Zoom)"
      ],
      certification: "Sertifikat dari Kemnaker RI"
    }
  ];

  return (
    <div className="ergonomi-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">BIDANG ERGONOMI, LINGKUNGAN KERJA<br />& BAHAN BERBAHAYA</h1>
            <p className="hero-subtitle">
              Program Pelatihan K3 Terlengkap dan Tersertifikasi
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
            K3 Bidang Ergonomi, Lingkungan Kerja, dan Bahan Berbahaya adalah cabang dari Keselamatan dan Kesehatan Kerja (K3) yang berfokus pada tiga aspek utama di tempat kerja, yaitu penyesuaian kerja dengan manusia (ergonomi), pengendalian kondisi lingkungan kerja, serta pengelolaan bahan kimia atau bahan berbahaya agar tidak menimbulkan risiko bagi pekerja maupun lingkungan.
          </p>
        </div>
      </section>

      {/* Training List */}
      <section className="section-training-list">
        <div className="container">
          {trainings.map((training, idx) => (
            <div key={idx} className="training-card-wrapper">
              {/* Training Header */}
              <div className="training-card-header">
                <h3 className="training-card-title">{idx + 1}. {training.title}</h3>
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
                    transform: `translateX(-${carouselPositions[idx] * 100}%)`,
                    transition: 'transform 0.5s ease'
                  }}
                >
                  {[0, 1, 2].map((slideIdx) => (
                    <div 
                      key={slideIdx}
                      className={`carousel-slide ${carouselImages[idx][slideIdx] ? 'has-image' : ''}`}
                      onClick={() => document.getElementById(`carousel-${idx}-${slideIdx}`).click()}
                    >
                      {carouselImages[idx][slideIdx] ? (
                        <img 
                          src={carouselImages[idx][slideIdx]} 
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
                        id={`carousel-${idx}-${slideIdx}`}
                        accept="image/*" 
                        onChange={(e) => handleCarouselImageUpload(idx, slideIdx, e)}
                        style={{ display: 'none' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button 
                  className="carousel-control carousel-control-prev"
                  onClick={() => moveCarousel(idx, -1)}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button 
                  className="carousel-control carousel-control-next"
                  onClick={() => moveCarousel(idx, 1)}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>

                {/* Carousel Dots */}
                <div className="carousel-indicators">
                  {[0, 1, 2].map((dotIdx) => (
                    <span 
                      key={dotIdx}
                      className={`carousel-indicator ${carouselPositions[idx] === dotIdx ? 'active' : ''}`}
                      onClick={() => setCarouselPosition(idx, dotIdx)}
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

                {/* Certification */}
                <div className="certification-box">
                  <h6 className="certification-title">
                    <i className="bi bi-award-fill"></i> Sertifikasi
                  </h6>
                  <p className="certification-text">{training.certification}</p>
                </div>
              </div>
            </div>
          ))}
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