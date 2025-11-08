import React, { useState } from 'react';
import '../cssnya/ketinggian.css';

export default function PekerjaanPadaKetinggian() {
  const [headerImage, setHeaderImage] = useState(null);
  const [carouselPositions, setCarouselPositions] = useState([0, 0, 0]);
  const [carouselImages, setCarouselImages] = useState([
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
      title: "Tenaga Kerja Bangunan Tinggi Tingkat 2",
      price: "Rp. 7.000.000",
      duration: "3 Hari",
      description: "Tenaga Kerja Bangunan Tinggi Tingkat 2 adalah tenaga kerja bersertifikat yang memiliki kemampuan melaksanakan dan membimbing pekerjaan di ketinggian secara aman dan profesional, dengan pemahaman penuh terhadap prosedur K3 dan penggunaan alat pelindung jatuh.",
      schedule: [
        { 
          months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], 
          dates: ["20 - 22", "18 - 20", "11 - 13", "15 - 17", "06 - 08", "10 - 12"] 
        },
        { 
          months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], 
          dates: ["08 - 10", "05 - 07", "09 - 11", "05 - 07", "04 - 06", "09 - 11"] 
        }
      ],
      background: "Kecelakaan akibat jatuh dari ketinggian merupakan salah satu penyebab kematian paling umum di proyek konstruksi dan berbagai jenis pekerjaan. Bekerja di ketinggian termasuk aktivitas berisiko tinggi, seperti di atap, tangga, perancah, tangki, lubang, atau struktur bangunan. Pelatihan ini bertujuan membekali tenaga kerja dengan pengetahuan dan keterampilan bekerja aman di ketinggian, agar mampu mengenali bahaya, menerapkan prosedur kerja aman, dan menggunakan alat pelindung yang sesuai untuk mencegah kecelakaan kerja.",
      objectives: [
        "Menyadari perannya dalam mencegah kejatuhan",
        "Mengidentifikasi dan mengevaluasi bahaya bekerja di ketinggian",
        "Menghilangkan atau mengendalikan bahaya jika memungkinkan",
        "Melatih diri mengenali potensi bahaya ketinggian",
        "Menggunakan sistem dan metode pencegahan jatuh yang tepat",
        "Memeriksa dan memelihara alat pelindung diri (APD) sebelum dan sesudah digunakan"
      ],
      materials: [
        "Peraturan perundangan K3 dalam pekerjaan pada ketinggian (2 JP)",
        "Karakteristik lantai kerja tetap dan sementara (1 JP)",
        "Alat pencegah & penahan jatuh kolektif serta alat pembatas gerak (1 JP)",
        "Prinsip penerapan faktor jatuh (1 JP)",
        "Prosedur kerja aman di ketinggian (3 JP)",
        "Teori & praktik bergerak horizontal atau vertikal (1 + 8 JP)",
        "Teknik bekerja aman pada struktur miring (1 JP)",
        "Teknik menaikkan dan menurunkan barang dengan sistem katrol (1 + 3 JP)",
        "Teori & praktik penyelamatan dalam keadaan darurat (2 JP)",
        "Ujian teori (2 JP) dan Ujian praktik (3 JP)"
      ],
      methods: [
        "Video materi online (self learning)",
        "Telekonferensi/penyampaian materi via Zoom",
        "Pre-test dan kuis",
        "Praktik lapangan (offline) sesuai protokol kesehatan",
        "Evaluasi online melalui temank3.id Kemnaker RI"
      ],
      grading: "Standar Kelulusan: Teori min. 65, Praktik min. 75, Nilai akhir rata-rata ≥ 70. Peserta diberi 1 kali remedial, bila belum lulus harus mengulang batch berikutnya (maks. 90 hari).",
      facilities: [
        "Sertifikat & Lisensi resmi Kemnaker RI",
        "Modul & training kit",
        "Souvenir",
        "Lunch + coffee break (saat offline)"
      ],
      requirements: [
        "Pendidikan minimal SLTA/sederajat, usia ≥18 tahun, sehat jasmani & rohani",
        "Surat keterangan sehat dari dokter",
        "Surat keterangan bekerja dari perusahaan",
        "Tidak memiliki hambatan fisik atau mental",
        "Melampirkan fotokopi KTP, ijazah terakhir, pas foto (2x2 & 4x6, latar merah) masing-masing 4 lembar",
        "Membawa APD lengkap: sepatu safety, sarung tangan, kacamata safety, baju kerja panjang",
        "Memiliki laptop/PC berkamera untuk ujian online",
        "Menandatangani pakta integritas bermaterai Rp10.000",
        "Bersedia mematuhi seluruh peraturan pelatihan",
        "Melampirkan hasil rapid test non-reaktif yang masih berlaku",
        "Memiliki email Gmail aktif",
        "Wajib mengikuti seluruh kegiatan tanpa terkecuali"
      ],
      certification: "Peserta yang lulus teori dan praktik akan memperoleh Sertifikat & Kartu Lisensi dari Kemnaker RI.",
      payment: "Pembayaran maksimal 3 hari sebelum pelatihan"
    },
    {
      title: "Tenaga Kerja Pada Ketinggian Tingkat 1",
      price: "Rp. 8.500.000",
      duration: "5 Hari",
      description: "Tenaga Kerja Pada Ketinggian Tingkat I adalah tenaga kerja yang memiliki kemampuan dasar bekerja dengan aman menggunakan metode akses tali, memahami prinsip K3, serta telah tersertifikasi oleh Kemnaker RI untuk melaksanakan pekerjaan di tempat tinggi dengan risiko jatuh.",
      schedule: [
        { 
          months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], 
          dates: ["21 - 25", "19 - 24", "04 - 08", "21 - 24", "19 - 22", "16 - 19"] 
        },
        { 
          months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], 
          dates: ["16 - 19", "14 - 17", "15 - 18", "13 - 16", "17 - 20", "15 - 17"] 
        }
      ],
      background: "Pembinaan ini merupakan panduan bagi pengusaha, pengurus tempat kerja, operator, teknisi, pemilik gedung, arsitek, dan praktisi industri yang melaksanakan pekerjaan pada ketinggian menggunakan metode akses tali. Pelatihan ini juga merupakan syarat minimum yang wajib dipenuhi oleh pengurus dan pekerja untuk mendapatkan lisensi resmi dari Kemnaker RI. Pelatihan membekali peserta dengan pengetahuan teknis, prosedur keselamatan, dan penggunaan alat kerja aman di ketinggian agar dapat mencegah kecelakaan fatal dalam aktivitas kerja di atas permukaan tanah.",
      objectives: [
        "Meningkatkan kemampuan peserta dalam bekerja aman menggunakan akses tali (rope access)",
        "Menjamin pekerja memahami peraturan K3 terkait pekerjaan pada ketinggian",
        "Membentuk tenaga kerja bersertifikat Kemnaker RI yang mampu melaksanakan pekerjaan di tempat tinggi secara aman dan efisien"
      ],
      materials: [
        "Peraturan perundangan K3 dalam pekerjaan pada ketinggian (2 JP)",
        "Identifikasi bahaya dalam kegiatan akses tali (1 JP)",
        "Pengetahuan tentang ketidaktahanan tergantung (suspension intolerance) dan penanganannya (1 JP)",
        "Prinsip faktor jatuh (fall factor) dalam akses tali (1 JP)",
        "Pemilihan, pemeriksaan, dan penggunaan peralatan akses tali (1 JP)",
        "Simpul dan angkur dasar (2 JP)",
        "Teknik manuver pergerakan pada tali (18 JP)",
        "Teknik pemanjatan pada struktur (4 JP)",
        "Teori dan praktik menaikkan/menurunkan barang dengan sistem katrol (2 JP)",
        "Teknik penyelamatan diri dan korban menggunakan alat turun (3 JP)",
        "Ujian teori (2 JP) dan Ujian praktik (5 JP)"
      ],
      methods: [
        "Presentasi & ceramah",
        "Latihan praktik langsung",
        "Diskusi dan studi kasus",
        "Simulasi & peralatan latihan"
      ],
      facilities: [
        "Modul dan training kit",
        "Sertifikat dan Lisensi resmi Kemnaker RI"
      ],
      requirements: [
        "Sehat jasmani dan rohani, dibuktikan surat dokter",
        "Tidak memiliki hambatan fisik atau mental",
        "Fotokopi KTP",
        "Fotokopi ijazah terakhir",
        "Pasfoto terbaru latar merah (2x2 & 4x6, masing-masing 4 lembar)",
        "Membawa APD pribadi: sepatu safety, sarung tangan kerja, kacamata safety, baju kerja panjang",
        "Wajib mematuhi peraturan pelatihan dan mengikuti seluruh kegiatan"
      ],
      certification: "Peserta yang lulus teori dan praktik akan memperoleh Sertifikat dan Kartu Lisensi Kemnaker RI.",
      payment: "Pembayaran dilakukan 3 hari sebelum pelaksanaan atau maksimal 1 minggu setelah pelaksanaan"
    },
    {
      title: "Tenaga Kerja Pada Ketinggian Tingkat 2",
      price: "Rp. 9.500.000",
      duration: "5 Hari",
      description: "Tenaga Kerja Pada Ketinggian Tingkat II adalah tenaga kerja bersertifikat Kemnaker RI yang memiliki kemampuan teknis dan tanggung jawab lebih tinggi dibanding tingkat I, dengan peran sebagai pelaksana sekaligus pembimbing dalam pekerjaan di ketinggian menggunakan metode akses tali secara aman, efektif, dan sesuai standar K3.",
      schedule: [
        { 
          months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"], 
          dates: ["21 - 25", "19 - 24", "04 - 08", "21 - 24", "19 - 22", "16 - 19"] 
        },
        { 
          months: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"], 
          dates: ["16 - 19", "14 - 17", "15 - 18", "13 - 16", "17 - 20", "15 - 17"] 
        }
      ],
      background: "Pelatihan Tenaga Kerja Pada Ketinggian (TKPT) adalah pembinaan resmi yang menjadi panduan bagi pemangku kepentingan seperti pengusaha, pengurus tempat kerja, operator, teknisi, pemilik gedung, arsitek, dan praktisi industri yang menerapkan metode akses tali (rope access) dalam pekerjaan di ketinggian. Program ini juga merupakan dasar pemberian lisensi atau izin resmi dari Kementerian Ketenagakerjaan (KEMNAKER RI) kepada pengawas K3 perusahaan untuk melakukan pembinaan dan pengawasan keselamatan serta kesehatan kerja (K3).",
      objectives: [
        "Membekali tenaga kerja agar mampu bekerja aman di ketinggian sesuai standar K3",
        "Memastikan peserta memahami peraturan, prinsip, dan teknik kerja aman dalam akses tali",
        "Mencegah kecelakaan kerja akibat jatuh dari tempat tinggi",
        "Memberikan sertifikasi dan lisensi resmi Kemnaker RI bagi peserta yang lulus"
      ],
      materials: [
        "Peraturan perundang-undangan K3 dalam pekerjaan pada ketinggian",
        "Identifikasi bahaya dalam kegiatan akses tali",
        "Pengetahuan tentang suspension intolerance (ketidaktahanan tergantung) dan penanganannya",
        "Penerapan prinsip fall factor (faktor jatuh) dalam akses tali",
        "Pemilihan, pemeriksaan, dan pemakaian peralatan akses tali yang sesuai",
        "Simpul dan angkur dasar",
        "Teknik manuver pergerakan pada tali",
        "Teknik pemanjatan pada struktur",
        "Teori & praktik menaikkan/menurunkan barang dengan sistem katrol",
        "Teknik penyelamatan diri dan korban menuju arah turun dengan alat turun (3 JP)"
      ],
      duration_note: "Durasi: 5 hari (total 50 JP) - 4 hari: Offline/tatap muka (teori & praktik), 1 hari: Evaluasi online melalui teman.k3 Kemnaker RI",
      requirements: [
        "Berbadan sehat, dibuktikan surat dokter",
        "Tidak memiliki hambatan fisik/mental yang mengganggu kegiatan atau pekerjaan",
        "Fotokopi KTP",
        "Fotokopi ijazah terakhir",
        "Pasfoto terbaru latar merah (2x2 & 4x6, masing-masing 4 lembar, tidak lebih dari 3 bulan)",
        "Sepatu safety",
        "Sarung tangan kerja",
        "Kacamata safety",
        "Baju kerja panjang / coverall",
        "Mematuhi seluruh peraturan selama kegiatan berlangsung",
        "Wajib mengikuti seluruh kegiatan pembinaan tanpa terkecuali"
      ],
      certification: "Sertifikat & Kartu Lisensi resmi dari Kemnaker RI sesuai tingkat pelatihan II",
      payment: "Pembayaran dilakukan sesuai ketentuan yang berlaku"
    }
  ];

  return (
    <div className="ketinggian-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">BIDANG PEKERJAAN PADA KETINGGIAN</h1>
            <p className="hero-subtitle">
              Program Pelatihan K3 untuk Bekerja Aman di Ketinggian
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
            Bidang Pekerjaan pada Ketinggian merupakan cabang dari K3 yang mengatur prosedur, teknik kerja aman, penggunaan alat pelindung diri (APD), serta sistem pencegahan jatuh bagi tenaga kerja yang melakukan aktivitas di atas permukaan tanah atau di tempat dengan risiko jatuh. Tujuannya adalah untuk mencegah kecelakaan akibat jatuh dari ketinggian, yang termasuk salah satu penyebab utama kematian kerja di sektor konstruksi dan industri.
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

                {/* Background */}
                <div className="info-box">
                  <h6 className="info-box-title">
                    <i className="bi bi-book-fill"></i> {idx === 0 ? "Latar Belakang" : "Pendahuluan"}
                  </h6>
                  <p className="info-box-text">{training.background}</p>
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

                {/* Methods */}
                {training.methods && (
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
                )}

                {/* Grading (only for training 1) */}
                {training.grading && (
                  <div className="info-box">
                    <h6 className="info-box-title">
                      <i className="bi bi-clipboard-check"></i> Standar Kelulusan
                    </h6>
                    <p className="info-box-text">{training.grading}</p>
                  </div>
                )}

                {/* Duration Note (only for training 3) */}
                {training.duration_note && (
                  <div className="info-box">
                    <h6 className="info-box-title">
                      <i className="bi bi-clock-fill"></i> Durasi Pelatihan
                    </h6>
                    <p className="info-box-text">{training.duration_note}</p>
                  </div>
                )}

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
                {training.facilities && (
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