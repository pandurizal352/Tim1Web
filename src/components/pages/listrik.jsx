import React, { useState } from 'react';
import '../cssnya/listrik.css';

export default function BidangListrik() {
  const [headerImage, setHeaderImage] = useState(null);
  const [carouselPositions, setCarouselPositions] = useState([0, 0]);
  const [carouselImages, setCarouselImages] = useState([
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
      title: "Ahli K3 Listrik",
      price: "Rp. 20.000.000",
      duration: "18 Hari",
      description: "Ahli K3 Listrik adalah tenaga ahli bersertifikat yang berwenang dalam mengawasi, menilai, dan memastikan seluruh kegiatan kelistrikan berlangsung aman, serta berperan penting dalam pencegahan kecelakaan listrik dan penerapan sistem manajemen K3 di perusahaan.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], dates: ["-", "06 - 26", "-", "21 - 10", "-", "-"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], dates: ["14 - 02", "-", "15 - 04", "-", "17 - 06", "-"] }
      ],
      regulations: [
        "Kepdirjen No. Kep. 48/PPK&K3/VIII/2015 tentang Kompetensi Ahli K3 Listrik",
        "Kepdirjen No. 311 Tahun 2002 tentang Kompetensi Teknisi K3 Listrik",
        "Permenaker No. 12 Tahun 2015 tentang K3 Listrik di Tempat Kerja",
        "Pasal 6 ayat (3)-(4): Perencanaan, pemasangan, perubahan, dan pemeliharaan harus dilakukan oleh Ahli K3 Listrik",
        "Pasal 7: Perusahaan dengan pembangkitan listrik > 200 KVA wajib memiliki Ahli K3 Listrik"
      ],
      objectives: [
        "Meningkatkan kemampuan dalam penerapan Norma K3 Listrik di tempat kerja",
        "Menguasai pembinaan dan pengawasan pelaksanaan K3",
        "Mampu melakukan perencanaan, pemasangan, pemeliharaan, pemeriksaan, dan pengujian instalasi listrik secara aman",
        "Pemahaman persyaratan K3 untuk perencanaan, pemasangan, pemeliharaan instalasi listrik",
        "Analisis dan pelaporan kecelakaan kerja listrik",
        "Pelaksanaan K3 dalam penerapan SMK3 (PP No. 50 Tahun 2012)"
      ],
      materials: [
        "Kebijakan dan Pengawasan K3",
        "Pembinaan & Pengawasan Norma K3",
        "Persyaratan K3 pada instalasi listrik di pembangkitan, transmisi, distribusi, dan pemanfaatan listrik",
        "Persyaratan K3 sistem penyalur petir dan listrik ruang khusus",
        "Identifikasi bahaya, penilaian dan pengendalian risiko listrik",
        "Pertolongan Pertama pada Kecelakaan (P3K) kerja listrik",
        "Praktik lapangan dan seminar",
        "Evaluasi teori dan praktik",
        "On Job Training (OJT) 4 hari dan pembuatan laporan di tempat kerja"
      ],
      requirements: [
        "Sehat jasmani & rohani (dibuktikan surat dokter)",
        "Pendidikan minimal D3/S1 Teknik dengan pengalaman ≥ 2 tahun di bidang kelistrikan",
        "Sudah bekerja (dibuktikan surat keterangan perusahaan)",
        "Memiliki laptop/PC dan jaringan internet stabil",
        "Menginstal aplikasi Google Classroom di smartphone",
        "Wajib hadir penuh selama 17 hari pelatihan",
        "Fotokopi ijazah terakhir, KTP, CV",
        "Pas foto (4x6 & 2x2, latar merah, masing-masing 4 lembar)",
        "Surat keterangan bekerja & surat sehat",
        "Hasil swab non reaktif & vaksinasi",
        "Menandatangani pakta integritas kehadiran"
      ],
      facilities: [
        "Makan siang & 2x coffee break per hari",
        "Sertifikat, SKP, dan Kartu Kewenangan Kemnaker RI",
        "E-Certificate attendance",
        "Modul / materi pelatihan",
        "Souvenir"
      ],
      certification: "Sertifikat, SKP, dan Kartu Kewenangan dari Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)"
    },
    {
      title: "Teknisi Listrik",
      price: "Rp. 8.000.000",
      duration: "7 Hari",
      description: "Teknisi K3 Listrik adalah tenaga kerja terampil dan bersertifikat yang berperan penting dalam pelaksanaan pekerjaan kelistrikan secara aman dan sesuai standar K3, guna menjamin keselamatan pekerja, keandalan sistem listrik, dan keamanan lingkungan kerja.",
      schedule: [
        { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], dates: ["-", "17 - 24", "03 - 10", "21 - 28", "19 - 26", "16 - 23"] },
        { months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], dates: ["14 - 21", "18 - 25", "08 - 15", "13 - 20", "10 - 17", "01 - 08"] }
      ],
      regulations: [
        "UU No. 13 Tahun 2003 tentang Ketenagakerjaan",
        "UU No. 1 Tahun 1970 tentang Keselamatan Kerja",
        "Kepmenakertrans No. 075/Men/2002 tentang PUIL 2000",
        "Permenaker No. Per.04/Men/1995 tentang PJK3",
        "Kepdirjen Binawas No. 311/BW/2002 tentang Sertifikasi K3 Teknisi Listrik"
      ],
      objectives: [
        "Memiliki kompetensi K3 Listrik sesuai Keputusan Dirjen Binwasnaker No. 311/BW/2002",
        "Mampu melakukan perencanaan, instalasi, pengoperasian, pemeliharaan sistem kelistrikan secara aman",
        "Memahami potensi bahaya listrik dan cara pencegahannya",
        "Menguasai teknik pengamanan dan proteksi sistem listrik",
        "Mampu melakukan pemeriksaan dan pengujian instalasi listrik"
      ],
      materials: [
        "Dasar-dasar K3",
        "Peraturan Perundangan K3 Listrik",
        "Dasar-dasar Teknik Listrik",
        "Identifikasi Bahaya Listrik",
        "Sistem Pengamanan",
        "Instalasi Listrik Ruang Khusus",
        "Sistem Proteksi Bahaya Petir",
        "Klasifikasi Pembebanan",
        "Praktik Pengukuran Listrik",
        "P3K",
        "Kunjungan Teknis",
        "Ujian Kompetensi"
      ],
      requirements: [
        "Sehat jasmani dan rohani",
        "Pendidikan minimal STM/sederajat dengan pengalaman kerja ≥ 2 tahun",
        "Surat keterangan bekerja dari perusahaan",
        "Laptop/PC dengan aplikasi Zoom, Timestamp Camera, Google Classroom",
        "Bersedia mengikuti seluruh kegiatan tanpa absen",
        "Perlengkapan Praktik: safety shoes, helmet, wearpack/kemeja safety",
        "Scan biodata, ijazah terakhir, KTP, CV",
        "Pas foto latar merah",
        "Surat kerja, surat sehat",
        "Sertifikat vaksin dosis 3",
        "Pakta integritas bermaterai"
      ],
      facilities: [
        "Sertifikat & Kartu Lisensi Kemnaker RI",
        "E-Certificate Attendance",
        "Modul/Materi",
        "Souvenir"
      ],
      certification: "Sertifikat & Kartu Lisensi dari Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)"
    }
  ];

  return (
    <div className="bidang-listrik-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">BIDANG LISTRIK</h1>
            <p className="hero-subtitle">
              Pelatihan K3 Ketenagalistrikan Bersertifikat Kemnaker RI
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
              <i className="bi bi-lightning-charge-fill upload-icon"></i>
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
          <div className="intro-card">
            <div className="intro-icon">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <div className="intro-content">
              <p className="text-paragraph">
                <strong>Bidang Listrik</strong> merupakan bagian penting dalam dunia ketenagalistrikan yang mencakup seluruh aktivitas yang melibatkan energi listrik sebagai sumber daya utama, mulai dari pembangkitan, transmisi, distribusi, hingga pemanfaatannya di tempat kerja.
              </p>
              <div className="warning-box">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <p>
                  Karena memiliki <strong>potensi bahaya tinggi</strong> seperti kejutan listrik, kebakaran, atau ledakan, maka bidang ini wajib dijalankan dengan <strong>standar keselamatan kerja ketat (K3 Listrik)</strong> dan tenaga kerja yang <strong>bersertifikat resmi</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training List */}
      <section className="section-training-list">
        <div className="container">
          {trainings.map((training, idx) => (
            <div key={idx} className="training-card-wrapper">
              {/* Training Header */}
              <div className="training-card-header">
                <h3 className="training-card-title">
                  <i className="bi bi-lightning-charge-fill"></i>
                  {idx + 1}. {training.title}
                </h3>
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

                {/* Regulations */}
                {training.regulations && (
                  <div className="training-section">
                    <h5 className="training-section-title">
                      <i className="bi bi-file-text"></i> Dasar Hukum / Regulasi
                    </h5>
                    <ul className="training-list">
                      {training.regulations.map((reg, i) => (
                        <li key={i} className="training-list-item">
                          <i className="bi bi-shield-check list-icon"></i>
                          <span>{reg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Objectives */}
                <div className="training-section">
                  <h5 className="training-section-title">
                    <i className="bi bi-bullseye"></i> Tujuan & Kompetensi
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

                {/* Facilities */}
                {training.facilities && (
                  <div className="training-section">
                    <h5 className="training-section-title">
                      <i className="bi bi-gift"></i> Fasilitas
                    </h5>
                    <ul className="training-list facilities-list">
                      {training.facilities.map((fac, i) => (
                        <li key={i} className="training-list-item">
                          <i className="bi bi-star-fill list-icon"></i>
                          <span>{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
              <h4 className="contact-name">Restu / Adina Restuningsih</h4>
              <p className="contact-detail">
                <i className="bi bi-phone"></i> 0813-6810-2031
              </p>
            </div>
            <div className="contact-card">
              <i className="bi bi-building contact-icon"></i>
              <h4 className="contact-name">Office</h4>
              <p className="contact-detail">
                <i className="bi bi-telephone"></i> 021-8621510 / 021-22086138 Ext. 203
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