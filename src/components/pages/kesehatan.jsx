import React, { useState } from 'react';
import '../cssnya/kesehatan.css';

export default function KesehatanKerja() {
  const [headerImage, setHeaderImage] = useState(null);
  const [carouselPositions, setCarouselPositions] = useState([0, 0, 0, 0]);
  const [carouselImages, setCarouselImages] = useState([
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
      title: "Petugas P3K Di Tempat Kerja",
      price: "Rp. 6.500.000",
      duration: "3 Hari",
      description: "Petugas P3K di Tempat Kerja adalah tenaga kerja terlatih dan bersertifikat yang bertugas memberikan pertolongan pertama pada kecelakaan atau gangguan kesehatan di tempat kerja, untuk menyelamatkan nyawa, mencegah komplikasi, dan mendukung penerapan budaya K3.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], dates: ["28 - 31", "25 - 27", "18 - 20", "28 - 30", "24 - 28", "24 - 26"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], dates: ["29 - 31", "27 - 29", "23 - 25", "29 - 31", "25 - 27", "15 - 17"] }
      ],
      objectives: [
        "Meningkatkan pengetahuan dan keterampilan tentang pelaksanaan P3K di tempat kerja",
        "Mampu memberikan pertolongan pertama terhadap penyakit mendadak dan kecelakaan kerja",
        "Memahami fungsi dan tanggung jawab Petugas P3K sesuai standar Kemnaker RI"
      ],
      materials: [
        "Dasar-dasar Kesehatan Kerja & Peraturan P3K",
        "Dasar-dasar P3K di Tempat Kerja",
        "Anatomi & Fisiologi Manusia",
        "Pertolongan Pertama pada Gangguan Umum",
        "Resusitasi Jantung Paru (RJP)",
        "Pertolongan Pertama pada Gangguan Lokal",
        "Tanggap Darurat & Evakuasi Korban"
      ],
      requirements: [
        "Pendidikan minimal SLTA/sederajat dan berbadan sehat",
        "Pengalaman kerja minimal 2 tahun",
        "Scan KTP, ijazah, CV, surat sehat & surat bekerja",
        "Pas foto latar merah (soft file)",
        "Pakta integritas bermaterai Rp10.000",
        "Sertifikat vaksin dosis ke-2",
        "Wajib memiliki laptop/PC berkamera",
        "Memiliki smartphone Android dengan aplikasi Zoom, WAG, Google Classroom"
      ],
      certification: "Sertifikat resmi Kemnaker RI, Lisensi Petugas P3K dan Buku Kerja dari Dinas Ketenagakerjaan setempat"
    },
    {
      title: "Hyperkes Untuk Paramedis",
      price: "Rp. 7.000.000",
      duration: "5 Hari",
      description: "Hiperkes untuk Paramedis adalah pelatihan bersertifikat yang mempersiapkan tenaga medis perusahaan untuk mengelola, memantau, dan melindungi kesehatan tenaga kerja, serta mencegah penyakit akibat kerja melalui penerapan prinsip Higiene Industri dan Kesehatan Kerja.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], dates: ["-", "10 - 14", "10 - 14", "14 - 18", "13 - 17", "09 - 13"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], dates: ["07 - 11", "04 - 08", "08 - 12", "06 - 10", "03 - 07", "08 - 12"] }
      ],
      objectives: [
        "Membekali peserta dengan pengetahuan dan keterampilan di bidang kesehatan kerja dan higiene industri",
        "Meningkatkan kemampuan paramedis dalam pencegahan dan penanganan penyakit akibat kerja (PAK)",
        "Mendorong penerapan program kesehatan kerja berbasis K3 di perusahaan",
        "Memenuhi persyaratan kompetensi tenaga medis perusahaan sesuai regulasi Kemnaker RI"
      ],
      materials: [
        "Peraturan Perundangan Kesehatan Kerja",
        "Dasar-dasar Kesehatan dan Keselamatan Kerja (K3)",
        "Bahaya Fisik, Biologi, Kimia, Psikologi, dan Ergonomi di Tempat Kerja",
        "Penyakit Akibat Kerja (PAK)",
        "Sanitasi Industri",
        "Pelaporan Kesehatan Kerja dan Data PAK",
        "Gizi Kerja dan Pengaruhnya terhadap Produktivitas",
        "Toksikologi Industri",
        "Higiene Industri dan Pengendalian Faktor Bahaya"
      ],
      requirements: [
        "Sehat jasmani dan rohani, dibuktikan dengan surat keterangan dokter",
        "Fotokopi KTP",
        "Fotokopi ijazah terakhir",
        "Pas foto berwarna (background merah, ukuran 4x6, 4 lembar)",
        "Surat keterangan bekerja dari perusahaan",
        "Menggunakan laptop/PC berkamera untuk pelatihan online"
      ],
      certification: "Sertifikat resmi dari Kemnaker RI dan Sertifikat Kepesertaan dari PT. Geo Mandiri Kreasi"
    },
    {
      title: "Hyperkes Untuk Dokter",
      price: "Rp. 8.000.000",
      duration: "6 Hari",
      description: "Hiperkes untuk Dokter adalah pelatihan bersertifikat yang mempersiapkan dokter perusahaan agar mampu mencegah, memantau, dan mengendalikan penyakit akibat kerja, serta mewujudkan lingkungan kerja yang sehat, aman, dan produktif melalui penerapan prinsip-prinsip Higiene Industri dan K3.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], dates: ["20 - 25", "10 - 15", "10 - 15", "21 - 26", "05 - 10", "09 - 14"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], dates: ["07 - 12", "04 - 09", "08 - 13", "06 - 11", "03 - 08", "08 - 13"] }
      ],
      objectives: [
        "Memberikan pengetahuan dan keterampilan mengenai kesehatan kerja dan higiene industri",
        "Meningkatkan kompetensi dokter perusahaan dalam pencegahan dan pengendalian penyakit akibat kerja (PAK)",
        "Mendukung penerapan program kesehatan kerja berbasis K3 di tempat kerja",
        "Memenuhi persyaratan kompetensi tenaga medis perusahaan sesuai standar Kemnaker RI"
      ],
      materials: [
        "Peraturan Perundangan Kesehatan Kerja",
        "Dasar-dasar Kesehatan dan Keselamatan Kerja (K3)",
        "Bahaya Fisik, Biologi, Kimia, Psikologi, dan Ergonomi di Tempat Kerja",
        "Penyakit Akibat Kerja (PAK)",
        "Sanitasi Industri",
        "Pelaporan dan Dokumentasi Kesehatan Kerja",
        "Gizi Kerja dan Dampaknya terhadap Produktivitas",
        "Toksikologi Industri",
        "Higiene Industri dan Pengendalian Bahaya"
      ],
      requirements: [
        "Sehat jasmani dan rohani, dibuktikan dengan surat keterangan dokter",
        "Fotokopi KTP",
        "Fotokopi ijazah terakhir (profesi dokter)",
        "Pas foto berwarna latar merah ukuran 4x6 (4 lembar)",
        "Surat keterangan dari perusahaan/instansi",
        "Menggunakan laptop/PC berkamera untuk kegiatan daring (online)"
      ],
      certification: "Sertifikat Resmi dari Kemnaker RI dan Sertifikat Kepesertaan dari PT. Geo Mandiri Kreasi"
    },
    {
      title: "K3 Rumah Sakit",
      price: "Rp. 6.000.000",
      duration: "4 Hari",
      description: "K3 Rumah Sakit adalah sistem perlindungan menyeluruh terhadap tenaga kerja, pasien, dan lingkungan rumah sakit, melalui penerapan manajemen keselamatan, kesehatan kerja, dan pengendalian risiko untuk mewujudkan rumah sakit yang aman, sehat, produktif, dan berkualitas.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], dates: ["15 - 18", "24 - 27", "17 - 20", "21 - 24", "19 - 22", "16 - 19"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], dates: ["14 - 17", "18 - 21", "15 - 18", "13 - 16", "17 - 20", "15 - 18"] }
      ],
      objectives: [
        "Meningkatkan kompetensi tenaga kesehatan dalam pengelolaan K3 di lingkungan rumah sakit",
        "Menjamin penerapan sistem K3RS yang sesuai regulasi dan standar akreditasi KARS/SNARS",
        "Mengurangi risiko kecelakaan kerja, penyakit akibat kerja, dan kerugian operasional rumah sakit"
      ],
      materials: [
        "Regulasi dan kebijakan K3 Rumah Sakit",
        "Dasar dan prinsip-prinsip K3",
        "Manajemen risiko K3 Rumah Sakit",
        "Sistem manajemen K3 Rumah Sakit (SMK3 RS)",
        "Keselamatan dan keamanan di Rumah Sakit",
        "Pelayanan kesehatan kerja bagi tenaga RS",
        "Pengelolaan bahan berbahaya dan beracun (B3)",
        "Pencegahan dan pengendalian kebakaran",
        "Pengelolaan prasarana RS dari aspek K3",
        "Pengelolaan peralatan medis dari aspek K3",
        "Kesiapsiagaan dan tanggap darurat bencana",
        "Implementasi K3 dalam standar akreditasi KARS / SNARS"
      ],
      requirements: [
        "D3 (Diploma) → pengalaman kerja min. 1 tahun di bidang kesehatan",
        "S1 (Sarjana) → pengalaman kerja min. 6 bulan",
        "Scan ijazah terakhir",
        "Scan KTP",
        "Scan sertifikat pelatihan K3 di fasilitas kesehatan (jika ada)",
        "Scan surat rekomendasi dari pimpinan"
      ],
      certification: "Sertifikat resmi dari Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI). Ditetapkan sebagai Ahli K3 Rumah Sakit dari perusahaan/institusi masing-masing"
    }
  ];

  return (
    <div className="kesehatan-kerja-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">BIDANG KESEHATAN KERJA</h1>
            <p className="hero-subtitle">
              Upaya Terencana untuk Mencegah Gangguan Kesehatan Akibat Pekerjaan dan Meningkatkan Kesejahteraan Tenaga Kerja
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
            Kesehatan Kerja adalah suatu upaya terencana dan berkesinambungan untuk mencegah gangguan kesehatan akibat pekerjaan, kondisi kerja, maupun lingkungan kerja, serta meningkatkan kesejahteraan tenaga kerja melalui penerapan prinsip-prinsip kesehatan dan keselamatan kerja di tempat kerja. Tingginya angka kecelakaan kerja menunjukkan masih rendahnya penerapan K3, sehingga diperlukan pembinaan dan pelatihan yang komprehensif untuk mewujudkan budaya kerja aman dan mendukung program Zero Accident.
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

                {/* Materials */}
                {training.materials && (
                  <div className="training-section">
                    <h5 className="training-section-title">
                      <i className="bi bi-book"></i> Materi Pelatihan
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
                )}

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